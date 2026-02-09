// Navigation Toggle for Mobile - Ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Nav toggle clicked, menu active:', navMenu.classList.contains('active'));
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close menu if it's the products dropdown link
                if (!link.parentElement.classList.contains('nav-dropdown') || window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                    }
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navToggle) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    } else {
        console.error('Navigation elements not found:', {navToggle, navMenu});
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `index.html#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Handle links to other pages with hash
document.querySelectorAll('a[href*="index.html#"], a[href*="products.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const [page, hash] = href.split('#');
        
        // If we're on the same page, prevent default and scroll
        if ((page === 'index.html' && window.location.pathname.endsWith('index.html')) ||
            (page === 'products.html' && window.location.pathname.endsWith('products.html')) ||
            (page === '' && hash)) {
            e.preventDefault();
            const target = document.getElementById(hash);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to section on page load if hash exists
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .partner-card, .partner-mini-card, .main-partner-card, .contact-card, .stat-card, .category-box, .partner-showcase-item, .info-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Get the submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            console.log('Form submitted:', formData);
        }, 1500);
        
        /* 
        Uncomment this section when you have a backend API
        
        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
        */
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/\D/g, ''));
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + (isPlus ? '+' : '') + (isPercentage ? '%' : '');
    }, stepTime);
};

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const number = entry.target.querySelector('.stat-number');
            if (number) {
                animateCounter(number);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Hide scroll indicator when scrolling
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Mobile dropdown - Keep always visible, allow navigation
const navDropdowns = document.querySelectorAll('.nav-dropdown');

navDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (link && menu) {
        // On mobile, make dropdown always visible
        if (window.innerWidth <= 768) {
            menu.style.display = 'block';
        }
        
        // Update on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                menu.style.display = 'block';
            } else {
                menu.style.display = '';
            }
        });
        
        // Don't prevent default - let the link navigate normally
        // Dropdown will always be visible on mobile, so no need to toggle
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === 'products.html' && href === 'products.html')) {
            link.classList.add('active');
        } else if (href.startsWith('#') && currentPage === 'index.html') {
            // Keep active state for hash links on index page
        } else {
            link.classList.remove('active');
        }
    });
});

console.log('Mahdi Trading & Supply Co. - Website Loaded Successfully');

// Spare Parts Gallery Carousel
var slideIndex = 1;
var autoSlideTimer;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}

function initGallery() {
    if (document.querySelector('.gallery-slider')) {
        showSlides(slideIndex);
        startAutoSlide();
        console.log('Gallery initialized with', document.getElementsByClassName("gallery-slide").length, 'slides');
    }
}

// Move slide by n positions
window.moveSlide = function(n) {
    clearTimeout(autoSlideTimer);
    slideIndex += n;
    showSlides(slideIndex);
    startAutoSlide();
}

// Go to specific slide
window.currentSlide = function(n) {
    clearTimeout(autoSlideTimer);
    slideIndex = n;
    showSlides(slideIndex);
    startAutoSlide();
}

// Show slides function with smooth scrolling dots
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("gallery-slide");
    var dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        slides[i].style.display = 'none';
    }
    
    // Reset all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
        dots[i].classList.remove('shadow-left');
        dots[i].classList.remove('shadow-right');
        dots[i].style.display = 'none';
        dots[i].style.opacity = '1';
        dots[i].style.transform = 'scale(1)';
    }
    
    // Show current slide
    slides[slideIndex - 1].style.display = 'block';
    slides[slideIndex - 1].classList.add('active');
    
    // Calculate which dots to show
    var totalDots = dots.length;
    var visibleDots = 5;
    var currentDot = slideIndex - 1;
    
    var startDot, endDot, leftShadowDot, rightShadowDot;
    
    if (totalDots <= visibleDots) {
        // Show all dots if there are 5 or fewer
        startDot = 0;
        endDot = totalDots;
        leftShadowDot = -1;
        rightShadowDot = -1;
    } else {
        // Start scrolling when we reach the 3rd position
        if (currentDot < 2) {
            // At the beginning (images 1-2)
            startDot = 0;
            endDot = visibleDots;
            leftShadowDot = -1;
            rightShadowDot = visibleDots; // Show shadow on the right
        } else if (currentDot >= totalDots - 2) {
            // At the end (last 2 images)
            startDot = totalDots - visibleDots;
            endDot = totalDots;
            leftShadowDot = startDot - 1; // Show shadow on the left
            rightShadowDot = -1;
        } else {
            // In the middle - scroll the window
            startDot = currentDot - 2;
            endDot = currentDot + 3;
            leftShadowDot = startDot - 1; // Show shadow on the left
            rightShadowDot = endDot; // Show shadow on the right
        }
    }
    
    // Show the main visible dots
    for (i = startDot; i < endDot; i++) {
        dots[i].style.display = 'inline-block';
    }
    
    // Show left shadow dot (partially hidden previous dot)
    if (leftShadowDot >= 0 && leftShadowDot < totalDots) {
        dots[leftShadowDot].style.display = 'inline-block';
        dots[leftShadowDot].style.opacity = '0.3';
        dots[leftShadowDot].style.transform = 'scale(0.7)';
        dots[leftShadowDot].classList.add('shadow-left');
    }
    
    // Show right shadow dot (partially hidden next dot)
    if (rightShadowDot >= 0 && rightShadowDot < totalDots) {
        dots[rightShadowDot].style.display = 'inline-block';
        dots[rightShadowDot].style.opacity = '0.3';
        dots[rightShadowDot].style.transform = 'scale(0.7)';
        dots[rightShadowDot].classList.add('shadow-right');
    }
    
    // Activate current dot
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
    
    console.log('Showing slide', slideIndex, 'of', slides.length, '| Dots visible:', (startDot + 1) + '-' + endDot);
}

// Auto slide function
function startAutoSlide() {
    clearTimeout(autoSlideTimer);
    autoSlideTimer = setTimeout(function() {
        slideIndex++;
        showSlides(slideIndex);
        startAutoSlide();
    }, 3000); // Change image every 3 seconds
}

// Pause on hover
setTimeout(function() {
    var galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', function() {
            clearTimeout(autoSlideTimer);
            console.log('Auto-slide paused');
        });
        
        galleryContainer.addEventListener('mouseleave', function() {
            startAutoSlide();
            console.log('Auto-slide resumed');
        });
    }
}, 100);

console.log('Spare Parts Gallery script loaded');


// ============================================
// HERO BANNER CAROUSEL
// ============================================
var bannerSlideIndex = 1;
var bannerAutoTimer;

// Initialize banner carousel when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBannerCarousel);
} else {
    initBannerCarousel();
}

function initBannerCarousel() {
    if (document.querySelector('.banner-slider')) {
        showBannerSlides(bannerSlideIndex);
        startBannerAutoSlide();
        console.log('Banner carousel initialized with', document.getElementsByClassName("banner-slide").length, 'slides');
    }
}

// Move banner slide by n positions
window.moveBannerSlide = function(n) {
    clearTimeout(bannerAutoTimer);
    bannerSlideIndex += n;
    showBannerSlides(bannerSlideIndex);
    startBannerAutoSlide();
}

// Go to specific banner slide
window.currentBannerSlide = function(n) {
    clearTimeout(bannerAutoTimer);
    bannerSlideIndex = n;
    showBannerSlides(bannerSlideIndex);
    startBannerAutoSlide();
}

// Show banner slides function
function showBannerSlides(n) {
    var i;
    var slides = document.getElementsByClassName("banner-slide");
    var dots = document.getElementsByClassName("banner-dot");
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {
        bannerSlideIndex = 1;
    }
    if (n < 1) {
        bannerSlideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Deactivate all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide
    slides[bannerSlideIndex - 1].classList.add('active');
    
    // Activate current dot
    if (dots[bannerSlideIndex - 1]) {
        dots[bannerSlideIndex - 1].classList.add('active');
    }
    
    console.log('Showing banner slide', bannerSlideIndex, 'of', slides.length);
}

// Auto slide function - changes every 15 seconds
function startBannerAutoSlide() {
    clearTimeout(bannerAutoTimer);
    bannerAutoTimer = setTimeout(function() {
        bannerSlideIndex++;
        showBannerSlides(bannerSlideIndex);
        startBannerAutoSlide();
    }, 15000); // Change image every 15 seconds
}

// Pause on hover
setTimeout(function() {
    var bannerCarousel = document.querySelector('.hero-banner-carousel');
    if (bannerCarousel) {
        bannerCarousel.addEventListener('mouseenter', function() {
            clearTimeout(bannerAutoTimer);
            console.log('Banner auto-slide paused');
        });
        
        bannerCarousel.addEventListener('mouseleave', function() {
            startBannerAutoSlide();
            console.log('Banner auto-slide resumed');
        });
    }
}, 100);

console.log('Hero banner carousel script loaded');

