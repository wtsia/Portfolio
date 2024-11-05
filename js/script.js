// script.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const overlayMenu = document.getElementById('overlay-menu');
    const closeBtn = document.getElementById('close-btn');
    const toggleThemeButton = document.getElementById('toggle-theme');

    // Function to open the overlay menu
    const openMenu = () => {
        overlayMenu.classList.add('active');
        overlayMenu.setAttribute('aria-hidden', 'false');
    };

    // Function to close the overlay menu
    const closeMenu = () => {
        overlayMenu.classList.remove('active');
        overlayMenu.setAttribute('aria-hidden', 'true');
    };

    // Event listener for hamburger click
    hamburger.addEventListener('click', (event) => {
        if (overlayMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlayMenu.addEventListener('click', (event) => {
        if (overlayMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Event listener for close button click
    closeBtn.addEventListener('click', closeMenu);

    // Event listener for clicking outside the overlay menu to close it
    overlayMenu.addEventListener('click', (event) => {
        if (event.target === overlayMenu) {
            closeMenu();
        }
    });

    // Allow opening the menu with Enter key when hamburger is focused
    hamburger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openMenu();
        }
    });

    // Allow closing the menu with Esc key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlayMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Toggle Dark Mode
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save user preference in localStorage
        if (document.body.classList.contains('dark-mode')) {
            toggleThemeButton.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleThemeButton.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});


// Smooth Scroll for Scroll Icon
const scrollIcon = document.querySelector('.scroll-icon');

scrollIcon.addEventListener('click', () => {
    document.querySelector('#intro').scrollIntoView({ behavior: 'smooth' });
});

// Helper Function
function randoFunction(str, n) {
    let result = '';
    for (let char of str) {
        if (/[A-Z]/.test(char)) {
            let randoString = String.fromCharCode(((char.charCodeAt(0) - 65 + n) % 26 + 26) % 26 + 65);
            result += randoString;
        } else if (/[a-z]/.test(char)) {
            let randoString = String.fromCharCode(((char.charCodeAt(0) - 97 + n) % 26 + 26) % 26 + 97);
            result += randoString;
        } else if (/[0-9]/.test(char)) {
            let randoString = String.fromCharCode(((char.charCodeAt(0) - 48 - n) % 10 + 10) % 10 + 48);
            result += randoString;
        } else {
            result += char;
        }
    }
    return result;
}

// Fetch and Display Medium Articles
document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');
    const mediumFeedURL = 'https://medium.com/feed/@winstontsia';
    const rss2jsonAPI = 'https://api.rss2json.com/v1/api.json';
    const apiKey = randoFunction('g35vswsv6wrn3jyw8dy6ixvmhocqu4hg4likjj1t', -1337);

    // Function to fetch Medium articles
    const fetchMediumArticles = async () => {
        try {
            const response = await fetch(`${rss2jsonAPI}?rss_url=${encodeURIComponent(mediumFeedURL)}&api_key=${apiKey}`);
            const data = await response.json();

            if (data.status === 'ok') {
                const articles = data.items.slice(0, 5); // Fetch latest 5 articles
                articlesContainer.innerHTML = ''; // Clear loading text

                articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('article');

                    const title = document.createElement('h3');
                    title.classList.add('article-title');
                    title.textContent = article.title;

                    const pubDate = document.createElement('p');
                    pubDate.classList.add('article-date');
                    const date = new Date(article.pubDate);
                    pubDate.textContent = date.toLocaleDateString();

                    const readMore = document.createElement('a');
                    readMore.classList.add('article-link');
                    readMore.href = article.link;
                    readMore.target = '_blank';
                    readMore.rel = 'noopener noreferrer';
                    readMore.textContent = 'Read More';

                    articleElement.appendChild(title);
                    articleElement.appendChild(pubDate);
                    articleElement.appendChild(readMore);

                    articlesContainer.appendChild(articleElement);
                });
            } else {
                articlesContainer.innerHTML = '<p>Failed to load articles.</p>';
            }
        } catch (error) {
            console.error('Error fetching Medium articles:', error);
            articlesContainer.innerHTML = '<p>Error loading articles.</p>';
        }
    };

    fetchMediumArticles();
});

