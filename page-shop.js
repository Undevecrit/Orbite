/* ORBITE — page /shop : vitrine de vote + proposition de prix */

const SHOP_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScaITVivKVuDMvkE3MmkvYRMQXBk_NiHFuj2iMAuyWLttwS8g/formResponse";
const SHOP_FORM_FIELDS = {
  produit: "entry.1275524923", // question "Produit"
  vote: "entry.2007728706",    // question "Vote"
  prix: "entry.891106695"      // question "Prix"
};
const SHOP_PRIX_MAX_FACTEUR = 10;  // prix proposé plafonné à 10 x le prix indicatif
const SHOP_COOLDOWN_MS = 3000;     // délai minimum entre deux envois
let shopLastSend = 0;

function shopFormIsConfigured() {
  const values = [SHOP_FORM_URL, ...Object.values(SHOP_FORM_FIELDS)];
  return values.every((v) => v && !v.includes("VOTRE_ID"));
}

function shopFmtPrix(n) {
  return Number(n).toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function shopReadVote(id) {
  try { return JSON.parse(localStorage.getItem("orbite-shop:" + id)); } catch (e) { return null; }
}
function shopSaveVote(id, data) {
  try { localStorage.setItem("orbite-shop:" + id, JSON.stringify(data)); } catch (e) { /* stockage indisponible */ }
}

function shopSend(produit, vote, prix) {
  if (!shopFormIsConfigured()) {
    console.warn("[Orbite] Vote boutique non envoyé : SHOP_FORM_URL / SHOP_FORM_FIELDS ne sont pas configurés.");
    return Promise.reject(new Error("non configuré"));
  }
  const data = new URLSearchParams();
  data.append(SHOP_FORM_FIELDS.produit, produit.id);
  data.append(SHOP_FORM_FIELDS.vote, vote === "oui" ? "Oui" : "Non");
  data.append(SHOP_FORM_FIELDS.prix, prix === null ? "" : String(prix));
  // mode "no-cors" : réponse illisible, mais l'envoi dans le Google Form fonctionne
  return fetch(SHOP_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data.toString(),
    keepalive: true
  });
}

function shopShowMerci(zone, saved) {
  zone.innerHTML = "";
  const p = document.createElement("p");
  p.className = "shop-merci";
  p.textContent = saved.vote === "oui"
    ? "Merci ! Tu as proposé " + shopFmtPrix(saved.prix) + ". Ça nous aide à concevoir cet article."
    : "Merci pour ton retour !";
  zone.appendChild(p);
}

function shopShowChoix(zone, produit) {
  zone.innerHTML = `
    <div class="shop-buttons">
      <button type="button" class="shop-btn shop-btn-oui">Je l'achèterais</button>
      <button type="button" class="shop-btn shop-btn-non">Pas pour moi</button>
    </div>
    <p class="shop-msg hidden" role="status"></p>`;
  const msg = zone.querySelector(".shop-msg");

  zone.querySelector(".shop-btn-oui").addEventListener("click", () => shopShowPrix(zone, produit));

  zone.querySelector(".shop-btn-non").addEventListener("click", (ev) => {
    if (document.getElementById("shop-hp").value) return; // robot
    if (Date.now() - shopLastSend < SHOP_COOLDOWN_MS) return;
    shopLastSend = Date.now();
    ev.target.disabled = true;
    shopSend(produit, "non", null).then(() => {
      const saved = { vote: "non", prix: null };
      shopSaveVote(produit.id, saved);
      shopShowMerci(zone, saved);
    }).catch(() => {
      ev.target.disabled = false;
      msg.textContent = "L'envoi a échoué, réessaie dans un instant.";
      msg.className = "shop-msg err";
    });
  });
}

function shopShowPrix(zone, produit) {
  const max = Math.round(produit.prixIndicatif * SHOP_PRIX_MAX_FACTEUR);
  zone.innerHTML = `
    <label class="shop-label" for="prix-${produit.id}">Quel prix te paraît juste ?</label>
    <div class="shop-prix-row">
      <input type="text" inputmode="decimal" id="prix-${produit.id}" class="shop-input" placeholder="${produit.prixIndicatif}" autocomplete="off">
      <span class="shop-eur">€</span>
      <button type="button" class="shop-btn shop-btn-envoyer">Envoyer</button>
      <button type="button" class="shop-btn shop-btn-retour">Retour</button>
    </div>
    <p class="shop-hint">Minimum : ${shopFmtPrix(produit.prixMin)}</p>
    <p class="shop-msg hidden" role="status"></p>`;

  const input = zone.querySelector(".shop-input");
  const msg = zone.querySelector(".shop-msg");
  const envoyer = zone.querySelector(".shop-btn-envoyer");
  const err = (t) => { msg.textContent = t; msg.className = "shop-msg err"; };
  input.focus();

  zone.querySelector(".shop-btn-retour").addEventListener("click", () => shopShowChoix(zone, produit));

  const submit = () => {
    if (document.getElementById("shop-hp").value) return; // robot
    const prix = parseFloat(input.value.trim().replace(",", "."));
    if (isNaN(prix)) return err("Entre un prix, par exemple " + produit.prixIndicatif + ".");
    if (prix < produit.prixMin) return err("Le minimum pour cet article est de " + shopFmtPrix(produit.prixMin) + ".");
    if (prix > max) return err("Le prix maximum accepté est de " + shopFmtPrix(max) + ".");
    if (Date.now() - shopLastSend < SHOP_COOLDOWN_MS) return err("Un instant avant de renvoyer.");
    shopLastSend = Date.now();

    const prixArrondi = Math.round(prix * 100) / 100;
    envoyer.disabled = true;
    shopSend(produit, "oui", prixArrondi).then(() => {
      const saved = { vote: "oui", prix: prixArrondi };
      shopSaveVote(produit.id, saved);
      shopShowMerci(zone, saved);
    }).catch(() => {
      envoyer.disabled = false;
      err("L'envoi a échoué, réessaie dans un instant.");
    });
  };
  envoyer.addEventListener("click", submit);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } });
}

function renderShop() {
  const grid = document.getElementById("shop-grid");
  grid.innerHTML = "";
  PRODUITS.forEach((p) => {
    const card = document.createElement("article");
    card.className = "shop-card";
    card.innerHTML = `
      ${p.image ? `<img class="shop-thumb" src="${p.image}" alt="${p.titre}" loading="lazy">` : ""}
      <h3>${p.titre}</h3>
      <p class="shop-desc">${p.description}</p>
      <p class="shop-indic">Prix indicatif : <strong>${shopFmtPrix(p.prixIndicatif)}</strong></p>
      <div class="shop-zone"></div>`;
    grid.appendChild(card);

    const img = card.querySelector(".shop-thumb");
    if (img) img.addEventListener("error", () => img.remove());

    const zone = card.querySelector(".shop-zone");
    const saved = shopReadVote(p.id);
    if (saved && saved.vote) shopShowMerci(zone, saved);
    else shopShowChoix(zone, p);
  });
}

renderShop();
