// script.js

// Night Mode Toggle
const toggleButton = document.getElementById('toggle-theme');
const body = document.body;

// Check for saved user preference, if any, on load of the website
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle between dark and light mode
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Smooth Scroll for Scroll Icon
const scrollIcon = document.querySelector('.scroll-icon');

scrollIcon.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Fetch and Display Medium Articles
document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');
    const mediumFeedURL = 'https://medium.com/feed/@winstontsia'; // Replace with your Medium RSS feed URL
    const rss2jsonAPI = 'https://api.rss2json.com/v1/api.json';
    const apiKey = 'YOUR_RSS2JSON_API_KEY'; // Replace with your RSS2JSON API key

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
