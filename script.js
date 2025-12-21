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

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const topNavMenu = document.querySelector('.top-nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        topNavMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-page-link').forEach(link => {
    link.addEventListener('click', () => {
        if (topNavMenu) {
            topNavMenu.classList.remove('active');
        }
    });
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

