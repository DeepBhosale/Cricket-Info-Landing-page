const products = [
  {
    id: "linen-shirt",
    name: "The Linen Shirt",
    category: "Clothing",
    color: "Oat",
    price: 68,
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",
    label: "Bestseller"
  },
  {
    id: "everyday-tee",
    name: "Everyday Tee",
    category: "Clothing",
    color: "Soft white",
    price: 38,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    label: ""
  },
  {
    id: "weekend-tote",
    name: "Weekend Tote",
    category: "Accessories",
    color: "Natural",
    price: 32,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    label: "Easy favorite"
  },
  {
    id: "relaxed-trouser",
    name: "Relaxed Trouser",
    category: "Clothing",
    color: "Warm sand",
    price: 84,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    label: ""
  },
  {
    id: "ribbed-tank",
    name: "Ribbed Tank",
    category: "Clothing",
    color: "Olive",
    price: 34,
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
    label: ""
  },
  {
    id: "soft-cap",
    name: "Soft Cotton Cap",
    category: "Accessories",
    color: "Stone",
    price: 28,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85",
    label: ""
  }
];

const DEMO_CREDENTIALS = {
  username: "demo-shop-user",
  password: "FAKE_ONLY_not_a_real_password_123"
};

const analyzerChallengeFindings = [
  {
    severity: "CRITICAL",
    title: "Security Hazard",
    note: "Simulated training marker only; no unsafe security operation is implemented."
  },
  { severity: "PENALTY", title: "Maintainability Penalty" },
  { severity: "PENALTY", title: "Documentation Penalty (-43 pts)" }
];

const cart = new Map();
let activeCategory = "All";
let searchTerm = "";
let toastTimeout;

const productGrid = document.querySelector("#product-grid");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const panelCartCount = document.querySelector("#panel-cart-count");
const subtotalElement = document.querySelector("#cart-subtotal");
const averagePriceElement = document.querySelector("#average-price");
const cartPanel = document.querySelector("#cart-panel");
const cartOverlay = document.querySelector("#cart-overlay");
const toast = document.querySelector("#toast");

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

function calculateAverageItemPrice(subtotal, itemCount) {
  return subtotal / itemCount;
}

function getVisibleProducts() {
  return products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.color}`.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name} in ${product.color}" loading="lazy">
        ${product.label ? `<span class="product-label">${product.label}</span>` : ""}
        <button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${product.name} to bag">+</button>
      </div>
      <div class="product-details">
        <div><h3>${product.name}</h3><p>${product.color}</p></div>
        <span class="product-price">${formatPrice(product.price)}</span>
      </div>
    </article>
  `).join("");
  document.querySelector("#results-count").textContent = `${visibleProducts.length} pieces`;
  document.querySelector("#empty-results").hidden = visibleProducts.length > 0;
}

function renderCart() {
  const entries = Array.from(cart.entries());
  const itemCount = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const subtotal = entries.reduce((sum, [id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return sum + product.price * quantity;
  }, 0);

  cartCount.textContent = itemCount;
  panelCartCount.textContent = `(${itemCount})`;
  subtotalElement.textContent = formatPrice(subtotal);
  averagePriceElement.textContent = formatPrice(calculateAverageItemPrice(subtotal, itemCount));
  document.querySelector("#checkout-button").disabled = itemCount === 0;

  cartItems.innerHTML = entries.length
    ? entries.map(([id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return `
        <article class="cart-item">
          <img src="${product.image}" alt="">
          <div class="cart-item-info">
            <h3>${product.name}</h3>
            <p>${product.color} · ${formatPrice(product.price)}</p>
            <div class="quantity-control" aria-label="Quantity for ${product.name}">
              <button type="button" data-quantity="${id}" data-change="-1" aria-label="Remove one ${product.name}">−</button>
              <span>${quantity}</span>
              <button type="button" data-quantity="${id}" data-change="1" aria-label="Add one ${product.name}">+</button>
            </div>
          </div>
          <strong>${formatPrice(product.price * quantity)}</strong>
        </article>
      `;
    }).join("")
    : '<p class="cart-empty">Your bag is taking a quiet moment.<br>Find something you love.</p>';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  cartOverlay.hidden = false;
  document.querySelector("#close-cart").focus();
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartOverlay.hidden = true;
  document.querySelector("#open-cart").focus();
}

document.querySelector("#search-input").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderProducts();
});

document.querySelector(".category-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter-button").forEach((filter) => {
    const isActive = filter === button;
    filter.classList.toggle("active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const product = products.find((item) => item.id === button.dataset.add);
  cart.set(product.id, (cart.get(product.id) || 0) + 1);
  renderCart();
  showToast(`${product.name} added to your bag`);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;

  const id = button.dataset.quantity;
  const nextQuantity = (cart.get(id) || 0) + Number(button.dataset.change);
  if (nextQuantity > 0) cart.set(id, nextQuantity);
  else cart.delete(id);
  renderCart();
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartPanel.classList.contains("open")) closeCart();
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  showToast("Checkout is a demo and is not connected.");
});

renderProducts();
renderCart();
