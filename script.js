// ============================================
// COMPLETE JAVASCRIPT FOR THELASTKNOWN WEBSITE
// ============================================

// Global data storage
let BLOG_POSTS = [];
let THREADS = [];

// Category information with header images
const CATEGORY_INFO = {
    ai: {
        title: "Artificial Intelligence",
        description: "Self-recordination for MAS, Tokenized Holistic Agents, Bringing engrams over Machine based Neural Networks, designing Agentic usecases & frameworks.",
        image: "images/headers/ai.png"
    },
    blockchain: {
        title: "Blockchain",
        description: "Network designs L1 | L2; AVS systems, RWA, Social-fi and emerging markets like multi-stable order-book, Active Collateral Services, Language Shared Security, and consensus mechanism.",
        image: "images/headers/blockchain.jpg"
    },
    cryptography: {
        title: "Cryptography",
        description: "Zero-knowledge proofs, encryption protocols, cryptographic primitives, and privacy-preserving technologies.",
        image: "images/headers/cryptography.png"
    },
    cosmology: {
        title: "Cosmology",
        description: "Consciousness as fundamental block, matter & celestial bodies impact on space, geometrical structure of universe and dimensionality.",
        image: "images/headers/cosmology.jpg"
    },
    evolution: {
        title: "Evolution & Adaptation",
        description: "Biological evolution, adaptation mechanisms, developmental biology, and emergent complexity in living systems.",
        image: "images/headers/evolution.png"
    },
    gametheory: {
        title: "System & Game Theory",
        description: "Network engineering, game-theoretic models, system dynamics, strategic behavior, and coordination mechanisms.",
        image: "images/headers/gametheory.jpg"
    },
    others: {
        title: "Others",
        description: "Cross-disciplinary insights, emerging topics, and breakthrough research across multiple domains.",
        image: "images/headers/others.jpg"
    }
};

const CATEGORIES = {
    ai: "AI",
    blockchain: "Blockchain",
    cryptography: "Cryptography",
    cosmology: "Cosmology",
    evolution: "Evolution & Adaptation",
    gametheory: "System & Game Theory",
    others: "Others"
};

let currentPage = 'home';
let currentCategory = null;

// Load content from content.json
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        BLOG_POSTS = data.posts || [];
        THREADS = data.threads || [];
        document.getElementById('loading').style.display = 'none';
        document.getElementById('home-page').classList.add('active');
        console.log('Content loaded:', BLOG_POSTS.length, 'posts,', THREADS.length, 'threads');
    } catch (error) {
        console.error('Error loading content:', error);
        document.getElementById('loading').innerHTML = '⚠️ Error loading content. Make sure content.json is uploaded!';
    }
}

// Show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');
    currentPage = pageId;
    window.scrollTo(0, 0);
    
    document.querySelectorAll('.page-link').forEach(l => {
        l.classList.remove('active');
        if (l.dataset.page === pageId) l.classList.add('active');
    });
    
    closeMobileMenu();
}

// Create post card HTML
function createPostCard(post) {
    return `<div class="post-card" data-post-id="${post.id}">
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-content">
            <div class="post-meta">
                <span class="post-category">${post.type || 'blog'}</span>
                <span>${post.date}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
        </div>
    </div>`;
}

// Create thread card HTML
function createThreadCard(thread) {
    return `<div class="thread-card">
        <div class="thread-header">
            <span class="post-category">thread</span>
            <span class="thread-date">${thread.date}</span>
        </div>
        <div class="thread-content">${thread.content}</div>
        <a href="${thread.link}" target="_blank" class="read-more-btn">Read More on X →</a>
    </div>`;
}

// Show category page
function showCategory(category) {
    currentCategory = category;
    const info = CATEGORY_INFO[category];
    
    // Update header
    document.getElementById('category-title').textContent = info.title;
    document.getElementById('category-description').textContent = info.description;
    document.getElementById('category-header-bg').src = info.image;
    
    // Filter and display content
    const blogs = BLOG_POSTS.filter(p => p.category === category && p.type === 'blog');
    document.getElementById('category-posts-blogs').innerHTML = blogs.length > 0 ? 
        blogs.map(createPostCard).join('') : '<p style="color:#666; padding: 2rem;">No blogs yet.</p>';
    
    const threads = THREADS.filter(t => t.category === category);
    document.getElementById('category-threads').innerHTML = threads.length > 0 ?
        threads.map(createThreadCard).join('') : '<p style="color:#666; padding: 2rem;">No threads yet.</p>';
    
    const protocols = BLOG_POSTS.filter(p => p.category === category && p.type === 'protocol');
    document.getElementById('category-posts-protocols').innerHTML = protocols.length > 0 ?
        protocols.map(createPostCard).join('') : '<p style="color:#666; padding: 2rem;">No protocols yet.</p>';
    
    // Add click handlers to post cards
    document.querySelectorAll('.post-card').forEach(c => {
        c.addEventListener('click', () => showPost(c.dataset.postId));
    });
    
    // Reset tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelector('[data-tab="blogs"]').classList.add('active');
    document.getElementById('blogs-content').classList.add('active');
    
    showPage('category');
}

// Show individual post
function showPost(postId) {
    const post = BLOG_POSTS.find(p => p.id == postId);
    if (!post) return;
    
    document.getElementById('post-content').innerHTML = `
        <article>
            <img src="${post.image}" alt="${post.title}" class="post-header-image">
            <div class="post-meta">
                <span class="post-category">${CATEGORIES[post.category]}</span>
                <span>${post.date}</span>
            </div>
            <h1 class="name-title">${post.title}</h1>
            <p class="subtitle">${post.excerpt}</p>
            <div class="post-body">${post.content}</div>
        </article>`;
    
    showPage('post');
}

// Close mobile menu
function closeMobileMenu() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('mobileOverlay').classList.remove('active');
}

// Initialize the app
function init() {
    // Load content
    loadContent();

    // Page navigation
    document.querySelectorAll('.page-link').forEach(l => {
        l.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(e.target.dataset.page);
        });
    });

    // Category navigation
    document.querySelectorAll('.category-link').forEach(l => {
        l.addEventListener('click', (e) => {
            e.preventDefault();
            showCategory(e.target.dataset.category);
        });
    });

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabName + '-content').classList.add('active');
        });
    });

    // Back button
    document.getElementById('post-back').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentCategory) {
            showCategory(currentCategory);
        } else {
            showPage('home');
        }
    });

    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('mobileOverlay').classList.toggle('active');
    });

    // Mobile overlay click
    document.getElementById('mobileOverlay').addEventListener('click', closeMobileMenu);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
