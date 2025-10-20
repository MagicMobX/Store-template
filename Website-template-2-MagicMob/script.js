console.clear();
console.log("✅ Fast script.js loaded");

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: [
    "Wireless Headphones", "Smart Watch", "Bluetooth Speaker", "Gaming Mouse",
    "Mechanical Keyboard", "USB-C Charger", "Power Bank", "Smartphone Stand",
    "Ring Light", "Tripod", "Portable SSD", "USB Hub", "Wireless Keyboard",
    "Webcam", "Microphone", "Laptop Cooling Pad", "HDMI Cable",
    "Memory Card 128GB", "VR Headset", "Wireless Earbuds"
  ][i],
  price: [999,1499,799,599,1299,499,899,299,749,599,2499,399,1099,999,899,699,249,1499,2999,1199][i],
  image: `https://via.placeholder.com/120?text=Item+${i + 1}`
}));

function initProducts() {
  const container = document.getElementById("product-container");
  if (!container) return console.error("❌ #product-container not found");

  // Use DocumentFragment to prevent reflows
  const fragment = document.createDocumentFragment();

  for (const p of products) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = p.id;

    card.innerHTML = `
      <div>
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             style="width:120px;height:120px;border-radius:8px;">
        <h3>${p.name}</h3>
        <p><b>₹${p.price}</b></p>
        <button class="add-to-cart"
          style="background:rgb(224,101,19);border:none;color:white;
                 padding:8px 15px;border-radius:8px;cursor:pointer;
                 font-weight:bold;">
          Add to Cart
        </button>
      </div>
    `;

    fragment.appendChild(card);
  }

  container.appendChild(fragment);

  // Add all listeners in one pass
  container.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.closest(".card").dataset.id);
      addToCart(id);
    }
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(`🛒 ${product.name} added to cart`);
  alert(`${product.name} added to cart!`);
}

window.addEventListener("DOMContentLoaded", initProducts);
