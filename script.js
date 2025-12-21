// Page Navigation System
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }

    // Update active link
    const navLinks = document.querySelectorAll('.nav-page-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Update breadcrumb
    updateBreadcrumb(pageName);
}

// Update breadcrumb based on current page
function updateBreadcrumb(pageName) {
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
        const pageNames = {
            'home': 'IEEE',
            'events': 'Events',
            'contact': 'Contact'
        };
        breadcrumbCurrent.textContent = pageNames[pageName] || 'IEEE';
    }
}

// Handle navigation clicks
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-page-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            showPage(pageName);

            // Update URL hash without scrolling
            history.pushState(null, null, '#' + pageName);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        const page = hash || 'home';
        showPage(page);
    });

    // Show initial page based on URL hash or default to home
    const initialHash = window.location.hash.substring(1);
    const initialPage = initialHash || 'home';
    showPage(initialPage);
});

// Mobile Navigation System
const menuToggle = document.getElementById('menuToggle');
const topMenuToggle = document.getElementById('topMenuToggle');
const mobileNavMenu = document.getElementById('mobileNavMenu');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

// Toggle mobile menu
function toggleMobileMenu() {
    if (menuToggle) menuToggle.classList.toggle('active');
    if (topMenuToggle) topMenuToggle.classList.toggle('active');
    mobileNavMenu.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mobileNavMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu
function closeMobileMenu() {
    if (menuToggle) menuToggle.classList.remove('active');
    if (topMenuToggle) topMenuToggle.classList.remove('active');
    mobileNavMenu.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Menu toggle button clicks
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

if (topMenuToggle) {
    topMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Overlay click to close menu
if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking a link (for both desktop and mobile nav)
document.querySelectorAll('.nav-page-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close menu on window resize (if resizing to desktop)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll effect to header
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.main-header');

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Camera Roll Gallery Scroll
function scrollGallery(galleryId, direction) {
    const gallery = document.getElementById(galleryId + '-gallery');
    if (gallery) {
        const scrollAmount = 400; // Scroll by 400px
        gallery.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

