function addToCart(button) {
    const productElement = button.parentElement;
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseInt(productElement.getAttribute('data-price'));

   
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    
    document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}


function toggleCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = ''; 

    let total = 0;
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ৳${item.price} x ${item.quantity}`;
        cartList.appendChild(listItem);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total.toFixed(2); 
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', updateCartCount);
