// Initialize the cart with some products
let cart = [
  { productName: "Laptop", price: 999, quantity: 1 },
  { productName: "Phone", price: 699, quantity: 2 },
  { productName: "Headphones", price: 199, quantity: 3 },
];

// Function to render the cart summary
const renderCart = () => {
  const cartSummary = document.getElementById('cartSummary');
  cartSummary.innerHTML = ''; // Clear previous cart

  cart.forEach(({ productName, price, quantity }) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `Product: ${productName}, Price: $${price}, Quantity: ${quantity}`;
    cartSummary.appendChild(cartItem);
  });

  // Display the total price
  calculateTotal();
};

// Add Product: Function to add a new product to the cart
const addProduct = () => {
  const productName = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const quantity = parseInt(document.getElementById('productQuantity').value);

  if (productName && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
    const newProduct = { productName, price, quantity };
    cart.push(newProduct);
    renderCart();  // Re-render the cart
  } else {
    alert('Please fill out all fields correctly.');
  }
};

// Calculate Total: Function to calculate the total cost of all items in the cart
const calculateTotal = () => {
  const total = cart.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = `Total Price: $${total.toFixed(2)}`;
};

// Remove Product: Arrow function to remove a product by name
const removeProduct = () => {
  const productNameToRemove = document.getElementById('removeProductName').value;
  
  cart = cart.filter(({ productName }) => productName.toLowerCase() !== productNameToRemove.toLowerCase());
  renderCart();  // Re-render the cart after removal
};

// Initially render the cart
renderCart();
