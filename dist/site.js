"use strict";
document.documentElement.classList.remove("no-js");
const toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navegacao");
const mobile = window.matchMedia("(max-width: 760px)");
function closeMenu(returnFocus = false) {
  navigation.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  if (returnFocus) toggle.focus();
}
toggle.addEventListener("click", () => {
  const opened = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(opened));
  navigation.classList.toggle("is-open", opened);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true")
    closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
});
mobile.addEventListener("change", () => closeMenu());
const settings = window.HOST_ONLY || {};
const instagram =
  typeof settings.instagram === "string" &&
  /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/.test(
    settings.instagram,
  )
    ? settings.instagram
    : null;
if (instagram)
  document.querySelectorAll("[data-instagram]").forEach((link) => {
    link.href = instagram;
  });
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
for (const key of ["city", "address", "hours"]) {
  document.querySelectorAll(`[data-${key}]`).forEach((element) => {
    element.textContent =
      settings[key] ||
      (key === "city" ? "[Localização a confirmar]" : "[A confirmar]");
  });
}
const phone = /^\d{10,15}$/.test(settings.whatsapp || "")
  ? settings.whatsapp
  : null;
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  if (!phone) {
    link.href = "#contato";
    link.removeAttribute("target");
    link.textContent = "WhatsApp — número pendente";
    return;
  }
  const message = link.dataset.message || settings.defaultMessage || "Olá!";
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  if (link.hasAttribute("data-phone-label"))
    link.textContent =
      phone.length === 13 && phone.startsWith("55")
        ? `+55 (${phone.slice(2, 4)}) ${phone.slice(4, 9)}-${phone.slice(9)}`
        : `+${phone}`;
});
const schemaElement = document.querySelector(
  'script[type="application/ld+json"]',
);
if (schemaElement) {
  const schema = JSON.parse(schemaElement.textContent);
  if (phone) schema.telephone = `+${phone}`;
  else delete schema.telephone;
  if (instagram) schema.sameAs = [instagram];
  schemaElement.textContent = JSON.stringify(schema);
}

const heroScene = document.querySelector(".hero-scene");
const heroVideo = document.querySelector(".hero-video");
const motionToggle = document.querySelector(".motion-toggle");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let pausedByUser = false;
let videoUnavailable = !heroVideo.canPlayType("video/mp4");
let sceneVisible = !("IntersectionObserver" in window);
heroVideo.muted = true;
function wantsMotion() {
  return !motionPreference.matches && !videoUnavailable && !pausedByUser && !document.hidden && sceneVisible;
}
function syncHeroMotion() {
  const allowed = !motionPreference.matches && !videoUnavailable;
  motionToggle.hidden = !allowed;
  motionToggle.dataset.paused = String(pausedByUser);
  motionToggle.querySelector("[data-motion-label]").textContent = pausedByUser
    ? "Retomar movimento"
    : "Pausar movimento";
  if (!wantsMotion()) {
    heroVideo.pause();
    heroScene.dataset.motion = "paused";
    if (!allowed) heroVideo.hidden = true;
    return;
  }
  if (!heroVideo.hasAttribute("src")) heroVideo.src = heroVideo.dataset.src;
  if (heroVideo.paused) heroVideo.play().catch((error) => {
    if (error.name !== "AbortError" && wantsMotion()) {
      pausedByUser = true;
      syncHeroMotion();
    }
  });
}
heroVideo.addEventListener("playing", () => {
  if (!wantsMotion()) { syncHeroMotion(); return; }
  heroVideo.hidden = false;
  heroScene.dataset.motion = "playing";
});
heroVideo.addEventListener("pause", () => { heroScene.dataset.motion = "paused"; });
heroVideo.addEventListener("error", () => {
  videoUnavailable = true;
  syncHeroMotion();
});
motionToggle.addEventListener("click", () => {
  pausedByUser = !pausedByUser;
  syncHeroMotion();
});
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    sceneVisible = entry.isIntersecting;
    syncHeroMotion();
  }).observe(heroScene);
}
motionPreference.addEventListener("change", syncHeroMotion);
document.addEventListener("visibilitychange", syncHeroMotion);
syncHeroMotion();
