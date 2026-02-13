// year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// reveal
const els = Array.from(document.querySelectorAll("[data-reveal]"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("revealed");
  });
}, { threshold: 0.14 });
els.forEach(el => io.observe(el));

// prices
const btn = document.getElementById("btnReveal");
let revealed = false;
const PRICES = {
  turnkey: "5 000 ₽",
  kiz: "7 / 6.5 / 6 / 5.5 ₽",
  docs: "от 5 000 ₽",
};
function renderPrices(){
  document.querySelectorAll("[data-price]").forEach(el => {
    const key = el.getAttribute("data-price");
    el.textContent = revealed ? (PRICES[key] || "по запросу") : "Стоимость по запросу";
  });
  if (btn) btn.textContent = revealed ? "Скрыть цены" : "Показать цены";
}
if (btn){
  btn.addEventListener("click", () => { revealed = !revealed; renderPrices(); });
  renderPrices();
}

// mouse glow
const mg = document.getElementById("mouseglow");
if (mg){
  window.addEventListener("mousemove", (e) => {
    mg.style.left = e.clientX + "px";
    mg.style.top  = e.clientY + "px";
    mg.style.opacity = "1";
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    mg.style.opacity = "0";
  });
}

// magnetic buttons
document.querySelectorAll(".magnet").forEach((el) => {
  const strength = 11;
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0,0)";
  });
});
