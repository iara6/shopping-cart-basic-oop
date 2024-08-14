const dessertCards = document.getElementById("dessert-card-container");

const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");

const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Red Velvet Cupcake",
    price: 2.99,
    category: "Cupcake",
    image: "./pics/pic-1.jpg"
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
    image: "./pics/pic-2.jpg"
  },
  {
    id: 3,
    name: "Chocolate Cake",
    price: 3.99,
    category: "Cake",
    image: "./pics/pic-3.jpg"
  },
  {
    id: 4,
    name: "Vanilla Ice Cream",
    price: 5.99,
    category: "Ice Cream",
    image: "./pics/pic-4.jpg"
  },
  {
    id: 5,
    name: "Strawberry Cheesecake",
    price: 10.99,
    category: "Cheesecake",
    image: "./pics/pic-5.jpg"
  },
  {
    id: 6,
    name: "Apple Pie",
    price: 2.99,
    category: "Pie",
    image: "./pics/pic-6.jpg"
  },
  {
    id: 7,
    name: "Tiramisu",
    price: 9.99,
    category: "Dessert",
    image: "./pics/pic-7.jpg"
  },
  {
    id: 8,
    name: "Chocolate Chip Cookies",
    price: 4.99,
    category: "Cookies",
    image: "./pics/pic-8.jpg"
  },
  {
    id: 9,
    name: "Lemon Tart ",
    price: 4.99,
    category: "Cake",
    image: "./pics/pic-9.jpg"
  },
  {
    id: 10,
    name: "Banana Pudding",
    price: 4.50,
    category: "Pudding",
    image: "./pics/pic-10.jpg"
  },
  {
    id: 11,
    name: "Carrot Cake",
    price: 6.99,
    category: "Cake",
    image: "./pics/pic-11.jpg"
  },
  {
    id: 12,
    name: "Key Lime Pie",
    price: 8.99,
    category: "Pie",
    image: "./pics/pic-12.jpg"
  },
];

products.forEach((product) => {
  dessertCards.innerHTML += `
    <div class="dessert-card">
      <div class="dessert-image-div">
        <img src="${product.image}">
      </div>
      <h2>${product.name}</h2>
      <p class="dessert-price">$${product.price.toFixed(2)}</p>
      <p class="product-category">Category: ${product.category}</p>
      <button 
        id="${product.id}" 
        class="btn add-to-cart-btn">Add to cart
      </button>
    </div>
  `;
})

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 9.38;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const {name, price} = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    });

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `
        ${currentProductCount} x`
      :productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>
          ${name}
        </p>
        <p>$${price.toFixed(2)}</p>
      </div>
      `;
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm("Are you sure you want to remove all items from your shopping cart?");
     
    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = '';
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
      iconNumberOfItems.innerText = 0;
      document.querySelector('.icon-items-number').style.right = "1rem";
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subtotal = this.items.reduce((total, item) => total + item.price, 0); // total - is an accumulator(start. from '0')
    const tax = this.calculateTaxes(subtotal);
    this.total = subtotal + tax;
    cartSubTotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

const iconNumberOfItems = document.querySelector('.icon-items-number');

[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
    iconNumberOfItems.innerText = cart.getCounts();
    if (Number(iconNumberOfItems.innerText) >= 10) {
      document.querySelector('.icon-items-number').style.right = "0.77rem";
    }
    cart.calculateTotal();
  });
});

const closeBtn = document.querySelector('.close-btn-div');
// Show Cart / Hide Cart button
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

closeBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = "Show";
  cartContainer.style.display = "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));

