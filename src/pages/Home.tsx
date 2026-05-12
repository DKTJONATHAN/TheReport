import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import AdBanner from '../components/AdBanner';
import '../styles/Home.css';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  image?: string;
  author?: string;
  featured?: boolean;
}

const majorCategories = ['Politics', 'Business', 'Sports', 'Lifestyle', 'Technology'];

const timeAgo = (date: string) => {
  const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const isLive = (date: string) => (new Date().getTime() - new Date(date).getTime()) < 4 * 60 * 60 * 1000;

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loadedCount, setLoadedCount] = useState(14);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'The Report | Latest Global News & Analysis',
    description: 'The Report delivers the latest news, in-depth analysis, and breaking stories from across the globe, covering politics, business, technology, and more.',
  });

  useEffect(() => {
    fetch('/posts-manifest.json')
      .then(res => res.json())
      .then(data => {
        setAllPosts(data);
        setLoading(false);
      })
      .catch(err => console.error('Error loading posts:', err));
  }, []);

  if (loading || allPosts.length === 0) return <div className="jm-container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading latest stories...</div>;

  const storyCircles = allPosts.slice(0, 10).map(post => ({
    label: post.category || 'News',
    image: post.image,
    link: `/posts/${post.slug}`,
    live: isLive(post.date)
  }));

  const [heroMain, ...heroRest] = allPosts;
  const heroSide = heroRest.slice(0, 4);
  const initialFeed = allPosts.slice(5, loadedCount);
  const mostRead = allPosts.slice(0, 6);
  const hasMore = allPosts.length > loadedCount;

  const loadMore = () => {
    setLoadedCount(prev => prev + 6);
  };

  return (
    <div className="jm-home-wrapper">
      {/* Story Circles */}
      <section className="pulse-bar">
        <div className="jm-container">
          <div className="pulse-track">
            {storyCircles.map((item, i) => (
              <Link to={item.link} className="pulse-node" key={i}>
                <div className={`ring-wrap ${item.live ? 'live' : ''}`}>
                  <img src={item.image || '/default-image.jpg'} alt={item.label} />
                  {item.live && <span className="live-badge">LIVE</span>}
                </div>
                <span className="pulse-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Nav Strip */}
      <nav className="cat-nav-strip">
        <div className="jm-container">
          <div className="cat-nav-inner">
            {majorCategories.map(cat => (
              <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="cat-nav-link">{cat}</Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="jm-container">
        <AdBanner zoneId="11004510" />
        {/* Hero Section */}
        <section className="hero-section">
          {/* Left Side */}
          <div className="hero-side-col left-col">
            {heroSide.slice(0, 2).map(post => (
              <article className="side-story" key={post.slug}>
                <Link to={`/posts/${post.slug}`}>
                  <div className="side-story-img">
                    <img src={post.image || '/default-image.jpg'} alt={post.title} />
                  </div>
                  <div className="side-story-text">
                    <span className="cat-tag">{post.category}</span>
                    <h3>{post.title}</h3>
                    <time className="story-time">{timeAgo(post.date)}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Center Main Hero */}
          <article className="hero-main">
            <Link to={`/posts/${heroMain.slug}`}>
              <div className="hero-main-img-wrap">
                <img src={heroMain.image || '/default-image.jpg'} alt={heroMain.title} />
                {isLive(heroMain.date) && <span className="breaking-banner">● BREAKING</span>}
              </div>
              <div className="hero-main-body">
                <span className="cat-tag accent">{heroMain.category}</span>
                <h1 className="hero-headline">{heroMain.title}</h1>
                <p className="hero-excerpt">{heroMain.description}</p>
                <time className="story-time">{timeAgo(heroMain.date)}</time>
              </div>
            </Link>
          </article>

          {/* Right Side */}
          <div className="hero-side-col right-col">
            {heroSide.slice(2, 4).map(post => (
              <article className="side-story" key={post.slug}>
                <Link to={`/posts/${post.slug}`}>
                  <div className="side-story-img">
                    <img src={post.image || '/default-image.jpg'} alt={post.title} />
                  </div>
                  <div className="side-story-text">
                    <span className="cat-tag">{post.category}</span>
                    <h3>{post.title}</h3>
                    <time className="story-time">{timeAgo(post.date)}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Content Split */}
        <div className="content-split">
          {/* Feed */}
          <div className="feed-col">
            <div className="section-header">
              <h2>Latest News</h2>
            </div>
            <div className="feed-grid">
              {initialFeed.map(post => (
                <article className="feed-card fade-in" key={post.slug}>
                  <Link to={`/posts/${post.slug}`} className="feed-card-link">
                    <div className="feed-card-img">
                      <img src={post.image || '/default-image.jpg'} alt={post.title} />
                      <span className="img-cat-overlay">{post.category}</span>
                    </div>
                    <div className="feed-card-body">
                      <h3 className="feed-card-title">{post.title}</h3>
                      <p className="feed-card-desc">{post.description}</p>
                      <time className="story-time">{timeAgo(post.date)}</time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            {hasMore && (
              <div className="load-more-wrap">
                <button className="btn-load-more" onClick={loadMore}>
                  Load More Stories
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="sidebar-col">
            <div className="sticky-box">
              <div className="widget">
                <div className="widget-header">
                  <h4>Most Read</h4>
                </div>
                <ol className="most-read-list">
                  {mostRead.map((post, i) => (
                    <li className="most-read-item" key={post.slug}>
                      <Link to={`/posts/${post.slug}`}>
                        <span className="read-number">{i + 1}</span>
                        <span className="read-title">{post.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="widget">
                <div className="widget-header">
                  <h4>Browse Topics</h4>
                </div>
                <nav className="topic-nav">
                  {majorCategories.map(cat => (
                    <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="topic-link">
                      <span>{cat}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
