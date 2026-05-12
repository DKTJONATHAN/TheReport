import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ChevronRight } from 'lucide-react';
import '../styles/Header.css';

const categories = ['Politics', 'Business', 'Sports', 'Lifestyle', 'Opinion'];
const navItems = [
  { href: '/', text: 'Home' },
  { href: '/category/politics', text: 'Politics' },
  { href: '/category/business', text: 'Business' },
  { href: '/category/sports', text: 'Sports' },
  { href: '/category/lifestyle', text: 'Lifestyle' },
  { href: '/about', text: 'About' },
];

const companyLinks = [
  { href: '/about', text: 'About Us' },
  { href: '/contact', text: 'Contact Desk' },
  { href: '/privacy', text: 'Privacy Policy' },
  { href: '/terms', text: 'Terms of Service' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetch('/posts-manifest.json')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error loading posts:', err));

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScroll / totalHeight) * 100;
      setScrollProgress(progress);

      if (currentScroll > 100 && currentScroll > lastScroll && !isMenuOpen) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll, isMenuOpen]);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }
    const results = posts.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (p.author && p.author.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 6);
    setSearchResults(results);
  }, [searchTerm, posts]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const tickerStories = posts.slice(0, 5);
  const doubleTicker = [...tickerStories, ...tickerStories];

  return (
    <header className="master-header">
      {/* Ticker */}
      <div className="edge-ticker">
        <div className="ticker-badge-wrap">
          <span className="ticker-pulse"></span>
          <span className="ticker-badge-text">LATEST</span>
        </div>
        <div className="ticker-mask">
          <div className="ticker-track">
            {doubleTicker.map((story, i) => (
              <div className="ticker-group" key={i}>
                <Link to={`/posts/${story.slug}`} className="ticker-link" onClick={() => setIsSearchOpen(false)}>
                  <span className="ticker-title">{story.title}</span>
                  <span className="ticker-sep">|</span>
                  <span className="ticker-desc">{story.description}</span>
                </Link>
                <span className="ticker-dot">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Utility Bar */}
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="date-display">{today}</div>
          <div className="utility-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="header-content">
          <button className="icon-btn menu-btn" onClick={toggleMenu} aria-label="Menu">
            <Menu size={24} />
          </button>

          <Link to="/" className="brand-center">
            <div className="brand-stack">
              <span className="brand-top">The</span>
              <h1 className="brand-main"><span className="highlight">Mwaniki</span> Report</h1>
            </div>
          </Link>

          <button className="icon-btn search-btn" onClick={toggleSearch} aria-label="Search">
            <Search size={24} />
          </button>
        </div>
      </div>

      {/* Sticky Nav */}
      <nav className={`sticky-nav ${!isSticky ? 'nav-up' : ''}`}>
        <ul className="nav-list">
          {navItems.map(link => (
            <li key={link.href}><Link to={link.href} className="nav-link">{link.text}</Link></li>
          ))}
        </ul>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="modern-search-modal active">
          <div className="search-backdrop" onClick={toggleSearch}></div>
          <div className="search-box">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={24} />
              <input 
                type="text" 
                className="fs-input" 
                placeholder="Search news, topics, or authors..." 
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="fs-esc-btn" onClick={toggleSearch}>ESC</button>
            </div>
            <div className="fs-results-area">
              <div className="fs-results">
                {searchTerm.length < 2 ? (
                  <div className="fs-empty">
                    <span className="fs-empty-label">Trending Topics</span>
                    <div className="fs-tags">
                      {categories.map(c => (
                        <Link key={c} to={`/category/${c.toLowerCase()}`} className="fs-tag" onClick={toggleSearch}>{c}</Link>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map(h => (
                    <Link key={h.slug} to={`/posts/${h.slug}`} className="search-hit" onClick={toggleSearch}>
                      <div className="hit-img-wrap">
                        <img src={h.image || '/default-image.jpg'} alt="" />
                      </div>
                      <div className="hit-content">
                        <div className="hit-meta">
                          <span className="hit-cat">{h.category || 'News'}</span>
                          <span className="hit-dot">•</span>
                          <span className="hit-author">By {h.author || 'Editorial Desk'}</span>
                        </div>
                        <h4 className="hit-title">{h.title}</h4>
                      </div>
                      <ChevronRight className="hit-arrow" size={20} />
                    </Link>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
                    No stories or authors found for "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`mm-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mm-backdrop" onClick={toggleMenu}></div>
        <div className="mm-panel">
          <div className="mm-header-row">
            <span className="mm-brand">Menu</span>
            <button className="mm-close-btn" onClick={toggleMenu} aria-label="Close Menu">
              <X size={24} />
            </button>
          </div>
          <div className="mm-scroll-content">
            <nav className="mm-nav-group">
              <h4 className="mm-label">Sections</h4>
              {categories.map(c => (
                <Link key={c} to={`/category/${c.toLowerCase()}`} className="mm-link-serif" onClick={toggleMenu}>
                  {c}
                  <ChevronRight size={16} className="arrow" />
                </Link>
              ))}
            </nav>
            <nav className="mm-nav-group">
              <h4 className="mm-label">Company</h4>
              {companyLinks.map(link => (
                <Link key={link.href} to={link.href} className="mm-link-sans" onClick={toggleMenu}>{link.text}</Link>
              ))}
            </nav>
          </div>
          <div className="mm-footer">
            <div className="mm-socials">
              <a href="https://x.com/maestropuns" target="_blank" rel="noreferrer">X</a>
              <a href="https://facebook.com/jonathanmwaniki" target="_blank" rel="noreferrer">FB</a>
              <a href="https://linkedin.com/in/jonathanmwaniki" target="_blank" rel="noreferrer">LI</a>
            </div>
            <div className="mm-copy">© 2026 The Mwaniki Report</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
