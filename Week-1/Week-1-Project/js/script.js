

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

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

const lottieContainer = document.getElementById('lottie-animation');
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
