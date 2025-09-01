const products = [
  { id: 1, name: "Smartphone", category: "electronics", price: 25000, rating: 4.5, img: "https://via.placeholder.com/200x150?text=Smartphone" },
  { id: 2, name: "Laptop", category: "electronics", price: 60000, rating: 4.8, img: "https://via.placeholder.com/200x150?text=Laptop" },
  { id: 3, name: "T-Shirt", category: "fashion", price: 800, rating: 4.0, img: "https://via.placeholder.com/200x150?text=T-Shirt" },
  { id: 4, name: "Jeans", category: "fashion", price: 1500, rating: 4.3, img: "https://via.placeholder.com/200x150?text=Jeans" },
  { id: 5, name: "Novel", category: "books", price: 500, rating: 4.7, img: "https://via.placeholder.com/200x150?text=Novel" },
  { id: 6, name: "Headphones", category: "electronics", price: 3000, rating: 4.2, img: "https://via.placeholder.com/200x150?text=Headphones" }
];

const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

function displayProducts(productList) {
  productContainer.innerHTML = "";
  productList.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>
      <p class="rating">⭐ ${product.rating}</p>
    `;
    productContainer.appendChild(productCard);
  });
}

function filterAndSortProducts() {
  let filteredProducts = [...products];

  // Filter by category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  // Sort products
  const sortValue = sortFilter.value;
  if (sortValue === "priceLow") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "priceHigh") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filteredProducts);
}

// Event listeners
categoryFilter.addEventListener("change", filterAndSortProducts);
sortFilter.addEventListener("change", filterAndSortProducts);

// Initial display
displayProducts(products);
