/**
 * ga4.js — helper simple para disparar page_view + eventos recomendados GA4
 * - Soporta debug_mode con ?debug=1
 * - Centraliza e-commerce items para que Explore tenga campos consistentes
 */

// Lee debug_mode desde querystring
function qs(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
const DEBUG_MODE = qs("debug") === "1";

// Carga gtag.js solo si hay Measurement ID válido
(function initGA4(){
  if (typeof GA4_MEASUREMENT_ID === "undefined" || !GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID.includes("G-XXXXXXXX")) {
    console.warn("[GA4] Falta Measurement ID. Edita ga4-config.js");
    window.__ga4_disabled__ = true;
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  // gtag.js loader
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_MEASUREMENT_ID);
  document.head.appendChild(s);

  // Config: desactivamos page_view automático para controlarlo nosotros (más limpio para práctica)
  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, {
    send_page_view: false,
    debug_mode: DEBUG_MODE
  });

  // User properties demo (práctica)
  const tier = localStorage.getItem("membership_tier") || "bronze";
  gtag("set", "user_properties", {
    membership_tier: tier,
    preferred_lang: "es",
    device_profile: (window.innerWidth < 768) ? "mobile" : "desktop"
  });

  // Consent demo (no es legal advice; es para simular el flujo)
  // Por defecto: granted. Puedes cambiarlo en settings.html
  const consent = localStorage.getItem("consent_analytics") || "granted";
  gtag("consent", "update", {
    analytics_storage: consent
  });
})();

function ga4Event(name, params){
  if (window.__ga4_disabled__) return;
  if (typeof window.gtag !== "function") return;
  const payload = Object.assign({}, params || {});
  if (DEBUG_MODE) payload.debug_mode = true;
  window.gtag("event", name, payload);
}

// Page view manual — útil para aprender page_location, page_title, page_referrer
function trackPageView(custom){
  const payload = Object.assign({
    page_title: document.title,
    page_location: window.location.href,
    page_referrer: document.referrer || undefined
  }, custom || {});
  ga4Event("page_view", payload);
}

// Helpers ecommerce GA4
function getCatalog(){
  return [
    { item_id: "SKU-1001", item_name: "Banda Elástica Pro", item_category: "fitness", price: 39.90 },
    { item_id: "SKU-1002", item_name: "Mancuernas 10kg", item_category: "fitness", price: 129.00 },
    { item_id: "SKU-2001", item_name: "Botella Térmica", item_category: "accessories", price: 49.90 },
    { item_id: "SKU-3001", item_name: "Mat Yoga Antideslizante", item_category: "yoga", price: 79.90 },
  ];
}

function getCart(){
  try { return JSON.parse(localStorage.getItem("cart_items") || "[]"); }
  catch(e){ return []; }
}

function setCart(items){
  localStorage.setItem("cart_items", JSON.stringify(items || []));
}

function addToCart(item_id, qty){
  const catalog = getCatalog();
  const base = catalog.find(x => x.item_id === item_id);
  if (!base) return;

  const cart = getCart();
  const existing = cart.find(x => x.item_id === item_id);
  if (existing) existing.quantity += (qty || 1);
  else cart.push(Object.assign({}, base, { quantity: (qty || 1) }));
  setCart(cart);

  ga4Event("add_to_cart", {
    currency: "PEN",
    value: base.price * (qty || 1),
    items: [{ item_id: base.item_id, item_name: base.item_name, item_category: base.item_category, price: base.price, quantity: (qty || 1) }]
  });
}

function removeFromCart(item_id){
  const cart = getCart();
  const idx = cart.findIndex(x => x.item_id === item_id);
  if (idx === -1) return;
  const removed = cart[idx];
  cart.splice(idx, 1);
  setCart(cart);

  ga4Event("remove_from_cart", {
    currency: "PEN",
    value: removed.price * (removed.quantity || 1),
    items: [{ item_id: removed.item_id, item_name: removed.item_name, item_category: removed.item_category, price: removed.price, quantity: (removed.quantity || 1) }]
  });
}

function calcCartValue(){
  const cart = getCart();
  return cart.reduce((acc, x) => acc + (Number(x.price)||0) * (Number(x.quantity)||1), 0);
}

function randomId(prefix){
  const rand = Math.random().toString(16).slice(2, 10).toUpperCase();
  return (prefix || "TX") + "-" + rand;
}
