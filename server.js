import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Fallback curated notes from Winston's Quartz digital garden (https://wtsia.github.io/rover/)
const FALLBACK_ROVER_POSTS = [
  {
    title: "Building a Simulated Security Operations Center",
    link: "https://wtsia.github.io/rover/posts/building-a-simulated-security-operations-center",
    pubDate: "2026-09-27",
    description: "A comprehensive homelab project implementing the Elastic Stack SIEM: foundational log management, telemetry ingestion, and proactive threat detection.",
    tags: ["SIEM & SOC", "Homelab & Proxmox"],
    readingTime: "6 min read"
  },
  {
    title: "Administering Active Directory Domain Services",
    link: "https://wtsia.github.io/rover/posts/administering-active-directory-domain-services",
    pubDate: "2026-09-27",
    description: "Core practices for enterprise Active Directory administration, user/group permission hierarchies, Kerberos authentication, and directory security hygiene.",
    tags: ["Active Directory", "Windows Server"],
    readingTime: "5 min read"
  },
  {
    title: "Deploying A Proxmox VE Server for Homelab Virtualization",
    link: "https://wtsia.github.io/rover/posts/deploying-a-proxmox-ve-server",
    pubDate: "2026-09-27",
    description: "Transforming bare-metal hardware into an enterprise hypervisor using Proxmox VE, bridge networking, ZFS storage pools, and isolated guest VMs.",
    tags: ["Homelab & Proxmox", "Linux"],
    readingTime: "5 min read"
  },
  {
    title: "Deploying Windows Server 2025 On Proxmox VE",
    link: "https://wtsia.github.io/rover/posts/deploying-windows-server-2025-on-proxmox-ve",
    pubDate: "2026-09-27",
    description: "Step-by-step technical guide on deploying Windows Server 2025 on Proxmox VE with VirtIO storage driver integration and virtual disk optimization.",
    tags: ["Windows Server", "Homelab & Proxmox"],
    readingTime: "4 min read"
  }
];

// Simple helper to strip XML tags and clean CDATA
function cleanXmlText(text = '') {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// Extract items from Quartz v5 RSS XML
function parseRssXml(xmlString) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xmlString)) !== null && items.length < 6) {
    const itemContent = match[1];
    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/i);
    const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/i);
    const dateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

    const title = titleMatch ? cleanXmlText(titleMatch[1]) : 'Untitled Note';
    let link = linkMatch ? cleanXmlText(linkMatch[1]) : 'https://wtsia.github.io/rover/';
    if (!link.startsWith('http')) {
      link = 'https://wtsia.github.io/rover/' + link.replace(/^\/+/, '');
    }

    // Skip index / tag pages
    const lowerTitle = title.toLowerCase();
    if (lowerTitle === 'posts' || lowerTitle === 'tags' || lowerTitle === 'tag index' || lowerTitle === 'index' || link.endsWith('/tags/') || link.endsWith('/posts/')) {
      continue;
    }

    let description = descMatch ? cleanXmlText(descMatch[1]) : '';
    if (description.length > 170) {
      description = description.slice(0, 165) + '...';
    } else if (!description || description === '...') {
      description = `Technical investigation on ${title} from Winston Tsia's Rover digital garden.`;
    }

    let pubDate = 'Recent';
    if (dateMatch) {
      try {
        const d = new Date(dateMatch[1]);
        if (!isNaN(d.getTime())) {
          pubDate = d.toISOString().split('T')[0];
        }
      } catch (e) {
        pubDate = dateMatch[1];
      }
    }

    // Infer contextual tags from title/slug
    const inferredTags = [];
    const lowerContent = (title + ' ' + link + ' ' + description).toLowerCase();
    if (lowerContent.includes('active directory') || lowerContent.includes('domain services')) inferredTags.push('Active Directory');
    if (lowerContent.includes('security operations') || lowerContent.includes('siem') || lowerContent.includes('soc')) inferredTags.push('SIEM & SOC');
    if (lowerContent.includes('proxmox') || lowerContent.includes('homelab')) inferredTags.push('Homelab & Proxmox');
    if (lowerContent.includes('windows server')) inferredTags.push('Windows Server');
    if (lowerContent.includes('network') || lowerContent.includes('routing')) inferredTags.push('Networking');
    if (inferredTags.length === 0) inferredTags.push('Quartz Garden', 'Systems');

    items.push({
      title,
      link,
      pubDate,
      description,
      tags: inferredTags.slice(0, 3),
      readingTime: '5 min read'
    });
  }

  return items;
}

// API endpoint to fetch recent posts from the Quartz digital garden
app.get('/api/blog-posts', async (req, res) => {
  try {
    // Attempt fetching Quartz RSS feed
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch('https://wtsia.github.io/rover/index.xml', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'WinstonPortfolio/2.0 (Quartz Integration)'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const xml = await response.text();
      const parsedPosts = parseRssXml(xml);
      if (parsedPosts.length > 0) {
        return res.json({
          status: 'success',
          source: 'quartz_live_feed',
          blogUrl: 'https://wtsia.github.io/rover/',
          posts: parsedPosts
        });
      }
    }

    // Try contentIndex.json if RSS yielded no items
    const jsonController = new AbortController();
    const jsonTimeout = setTimeout(() => jsonController.abort(), 2500);
    const jsonResponse = await fetch('https://wtsia.github.io/rover/static/contentIndex.json', {
      signal: jsonController.signal
    });
    clearTimeout(jsonTimeout);

    if (jsonResponse.ok) {
      const contentIndex = await jsonResponse.json();
      // Quartz contentIndex format: { [slug]: { title, content, date, tags } }
      const entries = Object.entries(contentIndex)
        .filter(([slug]) => slug !== 'index')
        .slice(0, 6)
        .map(([slug, data]) => ({
          title: data.title || slug.replace(/-/g, ' '),
          link: `https://wtsia.github.io/rover/${slug}`,
          pubDate: data.date ? new Date(data.date).toISOString().split('T')[0] : 'Recent',
          description: data.content ? data.content.slice(0, 150) + '...' : 'Note from Rover garden.',
          tags: Array.isArray(data.tags) && data.tags.length ? data.tags.slice(0, 3) : ['Quartz Garden'],
          readingTime: '4 min read'
        }));

      if (entries.length > 0) {
        return res.json({
          status: 'success',
          source: 'quartz_content_index',
          blogUrl: 'https://wtsia.github.io/rover/',
          posts: entries
        });
      }
    }

    // Return curated fallback posts
    return res.json({
      status: 'fallback',
      source: 'curated_rover_cache',
      blogUrl: 'https://wtsia.github.io/rover/',
      posts: FALLBACK_ROVER_POSTS
    });
  } catch (error) {
    console.warn('[Rover Feed] Network fetch failed, returning cached Quartz notes:', error.message);
    return res.json({
      status: 'fallback',
      source: 'curated_rover_cache',
      blogUrl: 'https://wtsia.github.io/rover/',
      posts: FALLBACK_ROVER_POSTS
    });
  }
});

// Serve static assets with html extensions enabled
app.use(express.static(__dirname, { extensions: ['html'] }));

// Explicit route for /about
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
