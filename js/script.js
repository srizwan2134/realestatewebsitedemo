// Simple Real Estate Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Basic mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.querySelector('.menu');
    
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Simple form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    field.style.borderColor = '#e9ecef';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });
    
    // Scroll Animations
    initScrollAnimations();
    
    console.log('Website loaded successfully!');
});

// Scroll Animation System
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = [
        { selector: '.hero-content', animation: 'fade-in-up' },
        { selector: '.search-form', animation: 'scale-in' },
        { selector: '.features .heading', animation: 'fade-in-up' },
        { selector: '.features .box:nth-child(1)', animation: 'fade-in-left' },
        { selector: '.features .box:nth-child(2)', animation: 'fade-in-right' },
        { selector: '.features .box:nth-child(3)', animation: 'fade-in-left' },
        { selector: '.features .box:nth-child(4)', animation: 'fade-in-right' },
        { selector: '.listings .heading', animation: 'fade-in-up' },
        { selector: '.stats .stat-item:nth-child(1)', animation: 'scale-in' },
        { selector: '.stats .stat-item:nth-child(2)', animation: 'scale-in' },
        { selector: '.stats .stat-item:nth-child(3)', animation: 'scale-in' },
        { selector: '.stats .stat-item:nth-child(4)', animation: 'scale-in' }
    ];
    
    // Add animation classes to elements
    animatedElements.forEach((item, index) => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.classList.add('animate-on-scroll', item.animation);
            if (index > 0) {
                element.classList.add(`stagger-${(index % 4) + 1}`);
            }
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Special Property Card Animations
    initPropertyCardAnimations();
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Smooth reveal for stats counter
    const statItems = document.querySelectorAll('.stats .stat-item h3');
    if (statItems.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statItems.forEach(stat => statsObserver.observe(stat));
    }
}

// Property Card Animation System
function initPropertyCardAnimations() {
    const propertyCards = document.querySelectorAll('.listings .box');
    
    if (propertyCards.length === 0) return;
    
    // Property card observer with specific options
    const propertyObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const propertyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to trigger CSS animations
                entry.target.classList.add('animate-in');
                
                // Optional: Add a subtle bounce effect
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                    }, 150);
                }, 800);
                
                // Stop observing after animation
                propertyObserver.unobserve(entry.target);
            }
        });
    }, propertyObserverOptions);
    
    // Observe all property cards
    propertyCards.forEach(card => {
        propertyObserver.observe(card);
    });
    
    // Enhanced hover effects for property cards
    propertyCards.forEach(card => {
        const image = card.querySelector('.thumb img');
        const saveButton = card.querySelector('.save button');
        
        // Image zoom effect on hover
        if (image) {
            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('animate-in')) {
                    image.style.transform = 'scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('animate-in')) {
                    image.style.transform = 'scale(1)';
                }
            });
        }
        
        // Save button interaction
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                saveButton.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    saveButton.style.transform = 'scale(1)';
                }, 150);
                
                // Toggle heart icon
                if (saveButton.classList.contains('far')) {
                    saveButton.classList.remove('far');
                    saveButton.classList.add('fas');
                    saveButton.style.color = '#ff6b6b';
                } else {
                    saveButton.classList.remove('fas');
                    saveButton.classList.add('far');
                    saveButton.style.color = '';
                }
            });
        }
    });
}

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (element.textContent.includes('.')) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}