/**
 * comp/handiv_medee.js
 * API-driven donation/news card (custom element: <donation-card>)
 *
 * ✅ Vanilla JS only
 * ✅ async/await + fetch()
 * ✅ Fetch news -> translate -> render
 * ✅ Polling auto-update
 * ✅ Does not break existing DOM usage (<donation-card ...attributes...>)
 *
 * -----------------------------------------------------------------------
 * CONFIGURATION (insert API keys or proxy endpoints here)
 * -----------------------------------------------------------------------
 */

const HANDIV_MEDEE_CONFIG = {
  // How often to poll (ms). Can be overridden per element via: refresh="45000"
  POLL_INTERVAL_MS: 45_000,

  // Network timeout for each request (ms)
  TIMEOUT_MS: 12_000,

  // ---------- NEWS ----------
  NEWS: {
    /**
     * Recommended (production-style):
     *   Create a backend proxy route and set PROXY_URL to:
     *     "http://localhost:5000/api/news"
     *
     * Proxy should return a NewsAPI-like JSON:
     *   { status: "ok", articles: [...] }
     *
     * If PROXY_URL is empty, the component calls News API directly.
     */
    PROXY_URL: "",

    // Direct call (example: NewsAPI.org)
    API_URL: "https://newsapi.org/v2/top-headlines",

    // ⛔ INSERT YOUR NEWS API KEY HERE
    API_KEY: "c13fc71193c94eca80b8c8abeea1105d",

    // Default query parameters (can be overridden by element attributes)
    DEFAULTS: {
      country: "us",
      category: "", // e.g. "health", "science", "general"
      q: "pets OR animals OR dogs OR cats",
      pageSize: 6
    }
  },

  // ---------- TRANSLATION ----------
  TRANSLATE: {
    /**
     * Recommended (production-style):
     *   Create a backend proxy route and set PROXY_URL to:
     *     "http://localhost:5000/api/translate"
     *
     * Proxy request (POST JSON):
     *   { texts: ["a","b"], target: "mn" }
     * Proxy response:
     *   { translations: ["...","..."] }
     *
     * If PROXY_URL is empty, the component calls Google Translate API directly.
     */
    PROXY_URL: "",

    // Direct call (Google Cloud Translation v2)
    API_URL: "https://translation.googleapis.com/language/translate/v2",

    // ⛔ INSERT YOUR GOOGLE CLOUD TRANSLATION API KEY HERE
    API_KEY: "YOUR_GOOGLE_TRANSLATE_API_KEY_HERE",

    DEFAULT_TARGET_LANG: "mn"
  },

  // Fallback image if an article has no image
  FALLBACK_IMAGE: "imgs/mainph.png"
};

/* --------------------------------------------------------------------- */
/* Utilities */
/* --------------------------------------------------------------------- */

function _toInt(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function _escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function _formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

function _estimateReadMinutes(text) {
  const words = String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
  if (!words) return 1;
  return Math.max(1, Math.round(words / 200));
}

async function _fetchJsonWithTimeout(url, options = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const body = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const detail =
        typeof body === "string"
          ? body.slice(0, 300)
          : JSON.stringify(body).slice(0, 300);
      throw new Error(`HTTP ${res.status} ${res.statusText}: ${detail}`);
    }

    return body;
  } finally {
    clearTimeout(id);
  }
}

/* --------------------------------------------------------------------- */
/* News + Translation Services */
/* --------------------------------------------------------------------- */

function _buildNewsUrl(params) {
  const { apiUrl, apiKey, country, category, q, pageSize } = params;

  const u = new URL(apiUrl);
  if (apiKey) u.searchParams.set("apiKey", apiKey);

  // NewsAPI.org requires (country|category|sources) for top-headlines.
  if (country) u.searchParams.set("country", country);
  if (category) u.searchParams.set("category", category);
  if (q) u.searchParams.set("q", q);
  if (pageSize) u.searchParams.set("pageSize", String(pageSize));

  return u.toString();
}

async function _fetchNews(params) {
  const { proxyUrl, apiUrl, apiKey, country, category, q, pageSize, timeoutMs } = params;

  // Prefer proxy if provided (recommended)
  if (proxyUrl) {
    const u = new URL(proxyUrl);
    if (country) u.searchParams.set("country", country);
    if (category) u.searchParams.set("category", category);
    if (q) u.searchParams.set("q", q);
    if (pageSize) u.searchParams.set("pageSize", String(pageSize));
    return _fetchJsonWithTimeout(u.toString(), {}, timeoutMs);
  }

  // Direct call
  if (!apiKey || apiKey.includes("YOUR_")) {
    throw new Error(
      "News API key is missing. Insert your key into HANDIV_MEDEE_CONFIG.NEWS.API_KEY or set NEWS.PROXY_URL."
    );
  }

  const url = _buildNewsUrl({ apiUrl, apiKey, country, category, q, pageSize });
  return _fetchJsonWithTimeout(url, {}, timeoutMs);
}

async function _translateBatch(params) {
  const { proxyUrl, apiUrl, apiKey, target, texts, timeoutMs } = params;

  const cleanTexts = (texts || []).map(t => String(t ?? ""));
  if (cleanTexts.length === 0) return [];

  // Prefer proxy if provided (recommended)
  if (proxyUrl) {
    const body = JSON.stringify({ texts: cleanTexts, target });
    const res = await _fetchJsonWithTimeout(
      proxyUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      },
      timeoutMs
    );

    if (!res || !Array.isArray(res.translations)) {
      throw new Error("Translate proxy returned an invalid response (expected { translations: [] }).");
    }
    return res.translations;
  }

  // Direct call to Google Translation v2
  if (!apiKey || apiKey.includes("YOUR_")) {
    throw new Error(
      "Translation API key is missing. Insert your key into HANDIV_MEDEE_CONFIG.TRANSLATE.API_KEY or set TRANSLATE.PROXY_URL."
    );
  }

  const url = new URL(apiUrl);
  url.searchParams.set("key", apiKey);

  const body = {
    q: cleanTexts,
    target,
    format: "text"
  };

  const data = await _fetchJsonWithTimeout(
    url.toString(),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    },
    timeoutMs
  );

  const translated = data?.data?.translations;
  if (!Array.isArray(translated)) {
    throw new Error("Google Translate API returned an invalid response.");
  }

  return translated.map(x => x?.translatedText ?? "");
}

/* --------------------------------------------------------------------- */
/* Feed Manager (one polling loop per unique config) */
/* --------------------------------------------------------------------- */

class LiveNewsFeed {
  constructor(feedKey, opts) {
    this.feedKey = feedKey;
    this.opts = opts;
    this.subscribers = new Set();

    this.timerId = null;
    this.isFetching = false;
    this.lastFingerprint = "";
    this.lastPayload = null;
    this.lastError = null;
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    // Push current state immediately
    fn({ payload: this.lastPayload, error: this.lastError });
    this._ensureRunning();
  }

  unsubscribe(fn) {
    this.subscribers.delete(fn);
    if (this.subscribers.size === 0) this._stop();
  }

  _ensureRunning() {
    if (this.timerId) return;

    // Immediately fetch, then poll
    this._tick();
    this.timerId = setInterval(() => this._tick(), this.opts.pollIntervalMs);
  }

  _stop() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
  }

  async _tick() {
    if (this.isFetching) return;
    this.isFetching = true;

    try {
      const newsJson = await _fetchNews({
        proxyUrl: this.opts.newsProxyUrl,
        apiUrl: this.opts.newsApiUrl,
        apiKey: this.opts.newsApiKey,
        country: this.opts.country,
        category: this.opts.category,
        q: this.opts.q,
        pageSize: this.opts.pageSize,
        timeoutMs: this.opts.timeoutMs
      });

      const articlesRaw = Array.isArray(newsJson?.articles) ? newsJson.articles : [];
      const articles = articlesRaw
        .filter(a => a && (a.title || a.description))
        .slice(0, this.opts.pageSize);

      // Fingerprint to avoid pointless re-renders
      const fpBase = articles.map(a => `${a?.url || ""}|${a?.publishedAt || ""}|${a?.title || ""}`).join("::");
      const fingerprint = `${articles.length}::${fpBase}`;

      // Translate AFTER fetch, BEFORE render
      let translatedArticles = articles;
      if (articles.length > 0) {
        const toTranslate = [];
        for (const a of articles) {
          toTranslate.push(a.title ?? "");
          toTranslate.push(a.description ?? "");
        }

        try {
          const translated = await _translateBatch({
            proxyUrl: this.opts.translateProxyUrl,
            apiUrl: this.opts.translateApiUrl,
            apiKey: this.opts.translateApiKey,
            target: this.opts.targetLang,
            texts: toTranslate,
            timeoutMs: this.opts.timeoutMs
          });

          // Pair translations back to articles (title, desc)
          translatedArticles = articles.map((a, idx) => {
            const tTitle = translated[idx * 2] ?? a.title ?? "";
            const tDesc = translated[idx * 2 + 1] ?? a.description ?? "";
            return { ...a, _tTitle: tTitle, _tDesc: tDesc };
          });
        } catch (translateErr) {
          // Translation failed: keep original, but do not kill the whole feed
          console.warn("[donation-card] Translation failed:", translateErr);
          translatedArticles = articles.map(a => ({ ...a, _tTitle: a.title ?? "", _tDesc: a.description ?? "" }));
        }
      }

      this.lastError = null;

      // Only notify if changed OR first time
      if (!this.lastPayload || fingerprint !== this.lastFingerprint) {
        this.lastFingerprint = fingerprint;
        this.lastPayload = translatedArticles;
        for (const fn of this.subscribers) fn({ payload: this.lastPayload, error: null });
      }
    } catch (err) {
      this.lastError = err;
      for (const fn of this.subscribers) fn({ payload: this.lastPayload, error: err });
    } finally {
      this.isFetching = false;
    }
  }
}

const HandivFeedManager = (() => {
  const feeds = new Map();

  function getFeed(opts) {
    const feedKey = JSON.stringify({
      // anything that changes the results or translation output should be in the key
      country: opts.country,
      category: opts.category,
      q: opts.q,
      pageSize: opts.pageSize,
      targetLang: opts.targetLang,
      newsProxyUrl: opts.newsProxyUrl,
      newsApiUrl: opts.newsApiUrl,
      translateProxyUrl: opts.translateProxyUrl,
      translateApiUrl: opts.translateApiUrl
    });

    if (!feeds.has(feedKey)) {
      feeds.set(feedKey, new LiveNewsFeed(feedKey, opts));
    }
    return feeds.get(feedKey);
  }

  return { getFeed };
})();

/* --------------------------------------------------------------------- */
/* Web Component */
/* --------------------------------------------------------------------- */

class HandivMedee extends HTMLElement {
  static get observedAttributes() {
    // Changing these should re-bind the feed
    return ["mode", "count", "refresh", "lang", "country", "category", "q", "page-size", "static"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._feed = null;
    this._onFeedUpdate = null;

    // Event delegation (won't break on re-render)
    this.shadowRoot.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("button[data-open-url]");
      if (!btn) return;
      const url = btn.getAttribute("data-open-url");
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  connectedCallback() {
    // Initial paint (keeps UI responsive)
    this._renderLoading();
    this._bindFeed();
  }

  disconnectedCallback() {
    this._unbindFeed();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    // Re-bind feed if config changed
    if (HandivMedee.observedAttributes.includes(name)) {
      this._renderLoading();
      this._bindFeed(true);
    }
  }

  /* --------------------------- Feed Binding --------------------------- */

  _getElementOptions() {
    const mode = (this.getAttribute("mode") || "feed").toLowerCase(); // "feed" or "single"
    const count = _toInt(this.getAttribute("count"), 1); // used in "feed"
    const refresh = _toInt(this.getAttribute("refresh"), HANDIV_MEDEE_CONFIG.POLL_INTERVAL_MS);
    const targetLang = (this.getAttribute("lang") || HANDIV_MEDEE_CONFIG.TRANSLATE.DEFAULT_TARGET_LANG).toLowerCase();

    const country = (this.getAttribute("country") || HANDIV_MEDEE_CONFIG.NEWS.DEFAULTS.country).toLowerCase();
    const category = (this.getAttribute("category") || HANDIV_MEDEE_CONFIG.NEWS.DEFAULTS.category).toLowerCase();
    const q = this.getAttribute("q") || HANDIV_MEDEE_CONFIG.NEWS.DEFAULTS.q;
    const pageSize = _toInt(this.getAttribute("page-size"), HANDIV_MEDEE_CONFIG.NEWS.DEFAULTS.pageSize);

    const isStatic = (this.getAttribute("static") || "").toLowerCase() === "true";

    return {
      mode,
      count: Math.max(1, count),
      pollIntervalMs: Math.max(10_000, refresh), // guardrail
      targetLang,
      country,
      category,
      q,
      pageSize: Math.max(1, Math.min(20, pageSize)), // guardrail

      timeoutMs: HANDIV_MEDEE_CONFIG.TIMEOUT_MS,

      newsProxyUrl: HANDIV_MEDEE_CONFIG.NEWS.PROXY_URL,
      newsApiUrl: HANDIV_MEDEE_CONFIG.NEWS.API_URL,
      newsApiKey: HANDIV_MEDEE_CONFIG.NEWS.API_KEY,

      translateProxyUrl: HANDIV_MEDEE_CONFIG.TRANSLATE.PROXY_URL,
      translateApiUrl: HANDIV_MEDEE_CONFIG.TRANSLATE.API_URL,
      translateApiKey: HANDIV_MEDEE_CONFIG.TRANSLATE.API_KEY,

      isStatic
    };
  }

  _bindFeed(forceRebind = false) {
    if (forceRebind) this._unbindFeed();

    const opts = this._getElementOptions();

    // If user explicitly wants static rendering, keep old behavior
    if (opts.isStatic) {
      this._renderFromAttributes();
      return;
    }

    this._feed = HandivFeedManager.getFeed(opts);

    this._onFeedUpdate = ({ payload, error }) => {
      if (error) {
        console.warn("[donation-card] News fetch error:", error);

        // Try to keep the UI meaningful:
        // - If we have previous payload: render it (stale-but-available)
        // - Else: fallback to attributes + show warning state
        if (Array.isArray(payload) && payload.length) {
          this._renderArticles(payload, { stale: true, error });
        } else {
          this._renderFromAttributes({
            warning:
              "Live мэдээ ачаалж чадсангүй. API тохиргоо / түлхүүр / CORS-г шалгана уу."
          });
        }
        return;
      }

      if (!Array.isArray(payload) || payload.length === 0) {
        this._renderEmpty("Одоогоор мэдээ олдсонгүй.");
        return;
      }

      this._renderArticles(payload, { stale: false, error: null });
    };

    this._feed.subscribe(this._onFeedUpdate);
  }

  _unbindFeed() {
    if (this._feed && this._onFeedUpdate) {
      this._feed.unsubscribe(this._onFeedUpdate);
    }
    this._feed = null;
    this._onFeedUpdate = null;
  }

  /* ------------------------------ Rendering ------------------------------ */

  _baseStyles() {
    // Keeps your existing look, but supports multi-card feed as well.
    return `
      <style>
        :host { display: block; }

        .wrap {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          margin: 20px 0;
        }

        .card {
          width: 260px;
          max-width: 100%;
          background: white;
          border-radius: 16px;
          border: 1px solid #f7e49c;
          padding: 16px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          font-family: sans-serif;
        }

        .card.full { width: 100%; }

        img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 12px;
          background: #f3f3f3;
        }

        h3 {
          margin: 12px 0 6px;
          font-size: 18px;
          font-weight: 600;
        }

        p {
          color: #555;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
        }

        .info {
          margin-top: 10px;
          font-size: 13px;
          color: #666;
        }

        .row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          flex-wrap: wrap;
        }

        .badge {
          display: inline-block;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(255, 248, 220, 0.6);
          color: #7a5a00;
        }

        .btn {
          margin-top: 16px;
          width: 100%;
          background: white;
          border: 1px solid #f6d35e;
          color: #b88a00;
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn:hover { background: #fff8dc; }

        .state {
          width: 100%;
          background: rgba(255,255,255,0.85);
          border: 1px dashed rgba(0,0,0,0.15);
          border-radius: 16px;
          padding: 14px 16px;
          font-family: sans-serif;
          color: #444;
          margin: 20px 0;
        }

        .muted { color: #777; font-size: 13px; margin-top: 6px; }
        .warning { color: #8a5a00; }
      </style>
    `;
  }

  _renderLoading() {
    this.shadowRoot.innerHTML = `
      ${this._baseStyles()}
      <div class="state">
        <div>Мэдээ ачаалж байна…</div>
        <div class="muted">API-аас өгөгдөл татаж, дараа нь орчуулж байна.</div>
      </div>
    `;
  }

  _renderEmpty(message) {
    this.shadowRoot.innerHTML = `
      ${this._baseStyles()}
      <div class="state">
        <div>${_escapeHtml(message)}</div>
      </div>
    `;
  }

  _renderFromAttributes(extra = {}) {
    const title = this.getAttribute("title") || "No title";
    const description = this.getAttribute("description") || "";
    const date = this.getAttribute("date") || "";
    const tag = this.getAttribute("tag") || "Мэдээ";
    const time = this.getAttribute("time") || "";
    const views = this.getAttribute("views") || "—";
    const image = this.getAttribute("image") || HANDIV_MEDEE_CONFIG.FALLBACK_IMAGE;

    const warning = extra.warning
      ? `<div class="muted warning">${_escapeHtml(extra.warning)}</div>`
      : "";

    this.shadowRoot.innerHTML = `
      ${this._baseStyles()}
      <div class="wrap">
        <div class="card">
          <img src="${_escapeHtml(image)}" alt="Image">
          <h3>${_escapeHtml(title)}</h3>
          <p>${_escapeHtml(description)}</p>
          <div class="info">
            <div class="row">📅 ${_escapeHtml(date)} | <span class="badge">${_escapeHtml(tag)}</span></div>
            <div class="row">⏱ ${_escapeHtml(time)}</div>
            <div class="row">👁 ${_escapeHtml(views)}</div>
          </div>
          <button class="btn">Үргэлжлүүлэн унших</button>
          ${warning}
        </div>
      </div>
    `;
  }

  _renderArticles(articles, { stale, error }) {
    const opts = this._getElementOptions();

    const list =
      opts.mode === "single"
        ? articles.slice(0, 1)
        : articles.slice(0, Math.max(opts.count, 1));

    const staleNote = stale
      ? `<div class="state"><div class="warning">Сэрэмжлүүлэг: Шинэчлэлт түр тасалдсан тул сүүлийн амжилттай татсан мэдээг харуулж байна.</div></div>`
      : "";

    const cardsHtml = list
      .map((a) => {
        const title = a?._tTitle ?? a?.title ?? "";
        const desc = a?._tDesc ?? a?.description ?? "";
        const date = _formatDate(a?.publishedAt);
        const tag = a?.source?.name ? String(a.source.name) : "Мэдээ";
        const time = `${_estimateReadMinutes(`${title} ${desc}`)} минут`;
        const views = "—"; // News APIs typically don't provide views
        const image = a?.urlToImage || HANDIV_MEDEE_CONFIG.FALLBACK_IMAGE;
        const url = a?.url || "";

        return `
          <div class="card">
            <img src="${_escapeHtml(image)}" alt="Image">
            <h3>${_escapeHtml(title)}</h3>
            <p>${_escapeHtml(desc)}</p>
            <div class="info">
              <div class="row">📅 ${_escapeHtml(date)} | <span class="badge">${_escapeHtml(tag)}</span></div>
              <div class="row">⏱ ${_escapeHtml(time)}</div>
              <div class="row">👁 ${_escapeHtml(views)}</div>
            </div>
            <button class="btn" data-open-url="${_escapeHtml(url)}">Үргэлжлүүлэн унших</button>
          </div>
        `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
      ${this._baseStyles()}
      ${staleNote}
      <div class="wrap">${cardsHtml}</div>
    `;
  }
}

window.customElements.define("donation-card", HandivMedee);
