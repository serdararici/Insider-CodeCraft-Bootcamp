

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const menuItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

const favBtns = document.querySelectorAll('.fav-btn');

favBtns.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active'); 
        if (this.classList.contains('active')) {
            this.innerText = 'Added to Favorites';
        } else {
            this.innerText = 'Add to Favorites';
        }
    });
});
