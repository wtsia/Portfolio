/**
 * Winston Tsia - Portfolio Interaction & Data Hydration
 * Clean data hydration reflecting CS & Math background, Skills, Projects, and Rover garden.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNavigation();
  initDataHydration();
  initRoverBlogFeed();
  initSmoothScroll();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('toggle-theme');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('wt_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
    toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    document.body.classList.remove('light-mode');
    toggleBtn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
    toggleBtn.setAttribute('aria-label', 'Switch to light mode');
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    if (isLight) {
      localStorage.setItem('wt_theme', 'light');
      toggleBtn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      localStorage.setItem('wt_theme', 'dark');
      toggleBtn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    }
  });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNavigation() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-overlay');
  if (!hamburger || !overlay) return;

  const toggleMenu = () => {
    const isOpen = overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.innerHTML = isOpen 
      ? '<i class="fas fa-times" aria-hidden="true"></i>' 
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  };

  const closeMenu = () => {
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. Data Hydration from PORTFOLIO_DATA (js/data.js)
   ========================================================================== */
function initDataHydration() {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.warn('[Portfolio] PORTFOLIO_DATA not found. Using static markup.');
    return;
  }

  // Hydrate Hero Metrics
  const metricsContainer = document.getElementById('hero-metrics-container');
  if (metricsContainer && Array.isArray(data.profile.metrics)) {
    metricsContainer.innerHTML = data.profile.metrics.map(m => `
      <div class="metric-item">
        <span class="metric-val">${m.value}</span>
        <span class="metric-lbl">${m.label}</span>
      </div>
    `).join('');
  }

  // Hydrate Skills from Resume Taxonomy
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && Array.isArray(data.skillsResume)) {
    skillsContainer.innerHTML = data.skillsResume.map(cat => `
      <div class="skill-category-card">
        <div class="skill-card-header">
          <h3 class="skill-card-title">${cat.category}</h3>
          <p class="skill-card-desc">${cat.description}</p>
        </div>
        <ul class="skill-items-list">
          ${cat.skills.map(s => `
            <li class="skill-item">
              <i class="fas fa-check-circle" aria-hidden="true"></i>
              <span>${s}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  // Hydrate Certifications & Industry Credentials
  const certsContainer = document.getElementById('certifications-container');
  if (certsContainer && Array.isArray(data.certifications)) {
    certsContainer.innerHTML = data.certifications.map(c => `
      <div class="cert-card">
        <div class="cert-badge-wrap">
          <img src="${c.badge}" alt="${c.name}" loading="lazy" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-award fa-2x\\' style=\\'color:var(--accent-primary)\\'></i>'">
        </div>
        <div class="cert-info-wrap">
          <div class="cert-issuer-meta">
            <span>${c.issuer}</span>
            <span class="sep">·</span>
            <span>${c.validity}</span>
          </div>
          <h3 class="cert-name">${c.name}</h3>
          <p class="cert-desc">${c.description}</p>
          <div class="cert-domains">
            ${c.domains.map((d, idx) => `<span>${d}</span>${idx < c.domains.length - 1 ? '<span class="sep">·</span>' : ''}`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Hydrate Active Focus & Pursuits
  const focusContainer = document.getElementById('focus-container');
  if (focusContainer && Array.isArray(data.activePursuits)) {
    focusContainer.innerHTML = data.activePursuits.map(item => `
      <div class="focus-card">
        <div class="focus-tagline">${item.status}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
  }

  // Hydrate Projects and Development
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer && Array.isArray(data.projectsAndDevelopment)) {
    projectsContainer.innerHTML = data.projectsAndDevelopment.map(p => `
      <article class="project-card" id="project-${p.id}">
        <div class="project-card-header">
          <div class="project-kicker">
            <span>${p.category}</span>
            <span>${p.period}</span>
          </div>
          <h3 class="project-card-title">${p.title}</h3>
        </div>
        <div class="project-card-body">
          <p class="project-card-summary">${p.description}</p>
          ${p.highlights && p.highlights.length ? `
            <ul class="project-highlights-list">
              ${p.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          ` : ''}
          <div class="project-tech-strip">
            ${p.techStack.map((tech, idx) => `
              <span>${tech}</span>${idx < p.techStack.length - 1 ? '<span class="sep">·</span>' : ''}
            `).join('')}
          </div>
        </div>
        ${(p.codeUrl || p.liveUrl || p.reportUrl) ? `
          <div class="project-card-footer">
            ${p.codeUrl ? `
              <a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" aria-label="View source code on GitHub for ${p.title}">
                <i class="fab fa-github" aria-hidden="true"></i> Source Code
              </a>
            ` : ''}
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" aria-label="View live deployment for ${p.title}">
                <i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo
              </a>
            ` : ''}
            ${p.reportUrl ? `
              <a href="${p.reportUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" aria-label="Read technical report PDF for ${p.title}">
                <i class="fas fa-file-pdf" aria-hidden="true"></i> Report PDF
              </a>
            ` : ''}
          </div>
        ` : ''}
      </article>
    `).join('');
  }
}

/* ==========================================================================
   4. Live Quartz v5 Blog Feed Integration (wtsia.github.io/rover)
   ========================================================================== */
function initRoverBlogFeed() {
  const container = document.getElementById('rover-posts-container');
  const refreshBtn = document.getElementById('refresh-rover-btn');
  const feedStatus = document.getElementById('rover-feed-status');
  if (!container) return;

  const data = window.PORTFOLIO_DATA;
  const fallbackPosts = data?.digitalGarden?.fallbackPosts || [];

  const renderPosts = (posts, isLive = false) => {
    if (!posts || posts.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; padding: 24px; text-align: center; color: var(--text-muted);">
          No posts currently loaded. Visit the <a href="https://wtsia.github.io/rover/" target="_blank" style="color: var(--accent-primary);">Rover Garden</a> directly.
        </div>
      `;
      return;
    }

    container.innerHTML = posts.map(post => {
      const cleanDate = post.pubDate || 'Recent';
      const readTime = post.readingTime || '5 min read';
      const tagsList = Array.isArray(post.tags) ? post.tags : ['Quartz Garden'];

      return `
        <article class="rover-card">
          <div class="rover-card-header">
            <div class="rover-card-meta">
              <span>${cleanDate}</span>
              <span>·</span>
              <span>${readTime}</span>
            </div>
            <h3 class="rover-card-title">
              <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>
            </h3>
            <p class="rover-card-desc">${post.description}</p>
          </div>
          <div class="rover-card-footer">
            <div class="rover-tags">
              ${tagsList.slice(0, 2).map((t, idx) => `
                <span>#${t}</span>${idx < tagsList.length - 1 ? ' ' : ''}
              `).join('')}
            </div>
            <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="rover-link-action" aria-label="Read full article on Rover Quartz garden">
              Read <i class="fas fa-arrow-right" aria-hidden="true" style="font-size: 0.75rem;"></i>
            </a>
          </div>
        </article>
      `;
    }).join('');

    if (feedStatus) {
      feedStatus.innerHTML = isLive
        ? '<span class="live-dot"></span> Live Quartz v5 Feed'
        : '<span class="live-dot" style="background:#38bdf8;"></span> Rover Garden (Syndicated)';
    }
  };

  const parseQuartzXml = (xmlText) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      const parsedPosts = [];

      items.forEach(item => {
        const titleEl = item.querySelector('title');
        const linkEl = item.querySelector('link');
        const descEl = item.querySelector('description');
        const pubDateEl = item.querySelector('pubDate');

        const title = titleEl ? titleEl.textContent.trim() : '';
        const link = linkEl ? linkEl.textContent.trim() : '';
        let description = descEl ? descEl.textContent.trim() : '';
        const pubDateRaw = pubDateEl ? pubDateEl.textContent.trim() : '';

        // Ignore index / category / home pages
        if (!title || !link) return;
        const lowerTitle = title.toLowerCase();
        if (lowerTitle === 'posts' || lowerTitle === 'tag index' || lowerTitle === 'home') return;
        if (link.endsWith('/posts/') || link.endsWith('/tags/') || link === 'https://wtsia.github.io/rover/' || link === 'https://wtsia.github.io/rover') return;

        // Clean up description HTML / CDATA
        description = description.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
        if (!description || description.length < 15) {
          if (lowerTitle.includes('active directory')) {
            description = 'Enterprise directory service administration, Kerberos authentication, and identity hygiene.';
          } else if (lowerTitle.includes('security operations center') || lowerTitle.includes('siem')) {
            description = 'Implementing Elastic Stack SIEM in a homelab environment for telemetry ingestion and threat detection.';
          } else if (lowerTitle.includes('proxmox')) {
            description = 'Bare-metal hypervisor setup with Proxmox VE, network bridges, and virtualized guest environments.';
          } else if (lowerTitle.includes('windows server')) {
            description = 'Step-by-step technical deployment and configuration of Windows Server in a virtualized lab.';
          } else {
            description = 'Technical field notes and systems configuration from the Rover digital garden.';
          }
        } else if (description.length > 200) {
          description = description.slice(0, 195) + '...';
        }

        // Format publication date
        let formattedDate = 'Recent';
        if (pubDateRaw) {
          const d = new Date(pubDateRaw);
          if (!isNaN(d.getTime())) {
            formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          }
        }

        // Determine contextual tags
        const tags = [];
        if (lowerTitle.includes('siem') || lowerTitle.includes('security operations') || lowerTitle.includes('soc')) {
          tags.push('SIEM & SOC', 'Elastic Stack');
        } else if (lowerTitle.includes('active directory')) {
          tags.push('Active Directory', 'Identity');
        } else if (lowerTitle.includes('proxmox')) {
          tags.push('Homelab & Proxmox', 'Virtualization');
        } else if (lowerTitle.includes('windows server')) {
          tags.push('Windows Server', 'Lab Infra');
        } else {
          tags.push('Homelab', 'Systems');
        }

        parsedPosts.push({
          title,
          link,
          description,
          pubDate: formattedDate,
          tags,
          readingTime: '5 min read'
        });
      });

      return parsedPosts;
    } catch (e) {
      console.warn('[Rover Feed] XML parsing warning:', e);
      return [];
    }
  };

  const fetchRoverFeed = async () => {
    if (refreshBtn) refreshBtn.classList.add('spin');
    const directFeedUrl = 'https://wtsia.github.io/rover/index.xml';

    try {
      // 1. Direct fetch to GitHub Pages Quartz RSS (CORS enabled by GitHub: Access-Control-Allow-Origin: *)
      const res = await fetch(directFeedUrl, { mode: 'cors' });
      if (res.ok) {
        const xmlText = await res.text();
        const livePosts = parseQuartzXml(xmlText);
        if (livePosts.length > 0) {
          renderPosts(livePosts.slice(0, 4), true);
          return;
        }
      }
      throw new Error(`Feed fetch status: ${res.status}`);
    } catch (err) {
      // 2. Graceful fallback to static cached garden posts without console errors
      renderPosts(fallbackPosts, false);
    } finally {
      if (refreshBtn) {
        setTimeout(() => refreshBtn.classList.remove('spin'), 400);
      }
    }
  };

  fetchRoverFeed();

  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchRoverFeed);
  }
}

/* ==========================================================================
   5. Smooth Scroll Offset
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
