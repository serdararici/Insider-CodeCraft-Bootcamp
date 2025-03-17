const products = [
    { id: 1, name: 'Laptop', price: 15000, stock: 5 },
    { id: 2, name: 'Telefon', price: 8000, stock: 10 },
    { id: 3, name: 'Tablet', price: 5000, stock: 8 },
    { id: 4, name: 'Kulaklık', price: 1000, stock: 15 },
    { id: 5, name: 'Mouse', price: 500, stock: 20 }
];


class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.discountApplied = false;
    }

    addItem(productId, quantity = 1) {
        try {
            const product = products.find(p => p.id === productId);
            
            if (!product) {
                throw new Error('Product not found!');
            }

            // FIX 1: Changed <= operator to <
            // Allow adding product if stock is exactly equal to quantity
            if (product.stock < quantity) {
                throw new Error('Insufficient stock!');
            }

            const existingItem = this.items.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    productId,
                    name: product.name,
                    price: product.price,
                    quantity
                });
            }

            // FIX 2: Added stock update
            // Decrease the stock by added quantity
            product.stock -= quantity;

            this.calculateTotal();
            this.updateUI();

        } catch (error) {
            console.error('Error adding product:', error);
            this.showError(error.message);
        }
    }

    removeItem(productId) {
        try {
            const itemIndex = this.items.findIndex(item => item.productId === productId);
            
            if (itemIndex === -1) {
                throw new Error('Product not found in cart!');
            }

            const item = this.items[itemIndex];
            const product = products.find(p => p.id === productId);

            if (product) {
                // FIX 3: Used item.quantity instead of constant value
                // Increase stock by the removed quantity
                product.stock += item.quantity;
            }

            this.items.splice(itemIndex, 1);
            this.calculateTotal();
            this.updateUI();

            // FIX 7: Stock return not updating
            // Dispatch document.dispatchEvent(new Event('stockUpdate')); after removeItem to update UI
            document.dispatchEvent(new Event('stockUpdate'));

        } catch (error) {
            console.error('Error removing product:', error);
            this.showError(error.message);
        }
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            // FIX 4: Added quantity multiplication
            // Calculate price * quantity for each item
            return sum + (item.price * item.quantity);
        }, 0);

        if (this.discountApplied && this.total > 0) {
            // FIX 5: Corrected discount calculation
            // Apply 10% discount by multiplying by 0.9
            this.total *= 0.9; // 10% discount
        }
    }

    applyDiscount(code) {
        if (code === 'INDIRIM10' && !this.discountApplied) {
            this.discountApplied = true;
            this.calculateTotal();
            this.updateUI();
            this.showMessage('Discount applied!');
        } else {
            this.showError('Invalid discount code!');
        }
    }

    // UI Update
    updateUI() {
        const cartElement = document.getElementById('cart');
        const totalElement = document.getElementById('total');
        
        if (cartElement && totalElement) {
            cartElement.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.quantity} items</span>
                    <span>${item.price * item.quantity} TL</span>
                    <button onclick="cart.removeItem(${item.productId})">Remove</button>
                </div>
            `).join('');

            totalElement.textContent = `Total: ${this.total.toFixed(2)} TL`;
        }
    }

    showError(message) {
        const errorElement = document.getElementById('error');
        if (errorElement) {
            // FIX 6: Reset error message instead of appending
            // Replace previous error messages instead of accumulating
            errorElement.textContent = message;
        }
    }

    showMessage(message) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = message;
            setTimeout(() => {
                messageElement.textContent = '';
            }, 3000);
        }
    }
}

class App {
    constructor() {
        window.cart = new ShoppingCart();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderProducts();
            this.setupEventHandlers();
        });
    }

    renderProducts() {
        const productsElement = document.getElementById('products');
        if (productsElement) {
            productsElement.innerHTML = products.map(product => `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price.toFixed(2)} TL</p>
                    <p>Stock: ${product.stock}</p>
                    <button onclick="app.addToCart(${product.id})"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            `).join('');
        }
    }

    setupEventHandlers() {
        const discountForm = document.getElementById('discount-form');
        if (discountForm) {
            discountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const codeInput = document.getElementById('discount-code');
                if (codeInput) {
                    window.cart.applyDiscount(codeInput.value);
                }
            });
        }

        document.addEventListener('stockUpdate', () => {
            this.renderProducts();
        });
    }

    addToCart(productId) {
        window.cart.addItem(productId, 1); 
        document.dispatchEvent(new Event('stockUpdate'));
    }
}

const app = new App();
window.app = app;