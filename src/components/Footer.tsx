import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, ChevronUp } from 'lucide-react';
import '../styles/Footer.css';

const socialLinks = [
  { 
    name: 'X (Twitter)', 
    url: 'https://x.com/maestropuns', 
    iconPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    bg: '#000000'
  },
  { 
    name: 'Facebook', 
    url: 'https://facebook.com/jonathanmwaniki', 
    iconPath: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
    bg: '#1877f2'
  },
  { 
    name: 'Instagram', 
    url: 'https://instagram.com/jonathanmwaniki', 
    iconPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    bg: '#e1306c'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com/in/jonathanmwaniki', 
    iconPath: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 11-2 2 2 2 0 012-2z',
    bg: '#0077b5'
  }
];

const footerLinks = [
  {
    title: 'Sections',
    links: [
      { name: 'Politics', url: '/category/politics' },
      { name: 'Business', url: '/category/business' },
      { name: 'Sports', url: '/category/sports' },
      { name: 'Opinion', url: '/category/opinion' },
      { name: 'Lifestyle', url: '/category/lifestyle' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Terms of Service', url: '/terms' }
    ]
  }
];

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="site-footer">
      <div className="footer-accent"></div>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <img src="/Jonathan-Mwaniki-logo.png" alt="JM Logo" className="footer-logo-img" width="50" height="50" />
              <div className="logo-text">
                <span>The</span>
                <span className="highlight">Mwaniki</span>
                <span>Report</span>
              </div>
            </Link>
            <p className="brand-desc">
              Professional journalism and insightful commentary from Kenya. Delivering truth through compelling storytelling.
            </p>
            <div className="social-row">
              {socialLinks.map((s) => (
                <a 
                  key={s.name}
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn" 
                  style={{ '--hover-bg': s.bg } as React.CSSProperties}
                  title={s.name}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d={s.iconPath}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="footer-col links-col">
              <h3 className="col-title">{section.title}</h3>
              <ul className="footer-nav">
                {section.links.map((link) => (
                  <li key={link.name}><Link to={link.url}>{link.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col newsletter-col">
            <h3 className="col-title">Stay Informed</h3>
            <p className="newsletter-text">Get the latest breaking news delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Jonathan Mwaniki. All rights reserved.
          </div>
          <button 
            className={`back-to-top ${isVisible ? 'visible' : ''}`} 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
