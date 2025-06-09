
// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Collapsible sections
document.querySelectorAll('.section h2').forEach(header => {
    header.addEventListener('click', () => {
        const section = header.parentElement;
        section.classList.toggle('collapsed');

        // Store state in localStorage
        const sectionId = section.id;
        const isCollapsed = section.classList.contains('collapsed');
        localStorage.setItem(`section-${sectionId}-collapsed`, isCollapsed);
    });

    // Initialize collapsed state from localStorage
    const section = header.parentElement;
    const sectionId = section.id;
    const isCollapsed = localStorage.getItem(`section-${sectionId}-collapsed`) === 'true';
    if (isCollapsed) {
        section.classList.add('collapsed');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Search functionality
function filterNotes() {
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase();
    const list = document.getElementById('notesList');
    const items = list.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;
        items[i].style.display = text.toLowerCase().includes(filter) ? "" : "none";
    }
}

function filterlab() {
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase();
    const list = document.getElementById('labList');
    const items = list.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;
        items[i].style.display = text.toLowerCase().includes(filter) ? "" : "none";
    }
}

function filterQuestion() {
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase();
    const list = document.getElementById('QuestionList');
    const items = list.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;
        items[i].style.display = text.toLowerCase().includes(filter) ? "" : "none";
    }
}

// Form handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});