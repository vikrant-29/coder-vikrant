// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', initialTheme);
updateToggleButton(initialTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
});

// Function to update button based on theme
function updateToggleButton(theme) {
    if (theme === 'dark') {
        themeToggle.textContent = '🌙 Dark Mode'; // or change class/icon
    } else {
        themeToggle.textContent = '☀️ Light Mode';
    }
}



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

function filterNotes() {
    const input = document.getElementById('searchBar');
    const searchTerms = input.value.trim().toLowerCase().split(/\s+/);
    const list = document.getElementById('notesList');
    const items = list.getElementsByTagName('li');
    const noResultsMsg = document.getElementById('noResultsMsg');

    let hasMatches = false;

    if (searchTerms[0] === '') {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "";
        }
        if (noResultsMsg) noResultsMsg.style.display = 'none';
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const noteText = (items[i].textContent || items[i].innerText).toLowerCase();
        const isMatch = searchTerms.every(term => noteText.includes(term));
        items[i].style.display = isMatch ? "" : "none";
        if (isMatch) hasMatches = true;
    }

    if (noResultsMsg) {
        noResultsMsg.style.display = hasMatches ? 'none' : 'block';
    }
}

function filterlab() {
    const input = document.getElementById('searchBar');
    const searchTerms = input.value.trim().toLowerCase().split(/\s+/);
    const list = document.getElementById('labList');
    const items = list.getElementsByTagName('li');
    const noResultsMsg = document.getElementById('noResultsMsg');

    let hasMatches = false;

    if (searchTerms[0] === '') {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "";
        }
        if (noResultsMsg) noResultsMsg.style.display = 'none';
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const labText = (items[i].textContent || items[i].innerText).toLowerCase();
        const isMatch = searchTerms.every(term => labText.includes(term));
        items[i].style.display = isMatch ? "" : "none";
        if (isMatch) hasMatches = true;
    }

    if (noResultsMsg) {
        noResultsMsg.style.display = hasMatches ? 'none' : 'block';
    }
}

function filterQuestion() {
    const input = document.getElementById('searchBar');
    const searchTerms = input.value.trim().toLowerCase().split(/\s+/);
    const list = document.getElementById('QuestionList');
    const items = list.getElementsByTagName('li');
    const noResultsMsg = document.getElementById('noResultsMsg');

    let hasMatches = false;

    if (searchTerms[0] === '') {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "";
        }
        if (noResultsMsg) noResultsMsg.style.display = 'none';
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const questionText = (items[i].textContent || items[i].innerText).toLowerCase();
        const isMatch = searchTerms.every(term => questionText.includes(term));
        items[i].style.display = isMatch ? "" : "none";
        if (isMatch) hasMatches = true;
    }

    if (noResultsMsg) {
        noResultsMsg.style.display = hasMatches ? 'none' : 'block';
    }
}

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Disable button to prevent multiple submits
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Create FormData and ensure form-name is included
    const formData = new FormData(form);
    formData.append('form-name', 'contact'); // Critical for Netlify
    
    fetch('/', {  // Changed from form.action to root path
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you! Your message has been sent.');
            form.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        alert('There was a problem sending your message. Please try again.');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    });
});