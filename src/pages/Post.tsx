import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Clock, User, Calendar, Share2, MessageSquare, ChevronRight, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import AdBanner from '../components/AdBanner';
import '../styles/Post.css';

interface PostData {
  title: string;
  date: string;
  description: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  category?: string;
  tags?: string[];
}

// Custom Social Icons since Lucide version is missing them
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<{ data: PostData; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useSEO({
    title: post ? `${post.data.title} | The Report` : 'Loading... | The Report',
    description: post?.data.description,
    type: 'article',
    image: post?.data.image
  });

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    // Use the public post endpoint
    fetch(`/posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.text();
      })
      .then(text => {
        const { data, content } = matter(text);
        setPost({ data: data as PostData, content });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // Fetch manifest for related posts
    fetch('/posts-manifest.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const filtered = data
            .filter((p: any) => p.slug !== slug)
            .sort(() => 0.5 - Math.random()) // Randomize for variety
            .slice(0, 4);
          setRelatedPosts(filtered);
        }
      })
      .catch(err => console.error('Error loading manifest:', err));
  }, [slug]);

  if (loading) return (
    <div className="jm-container" style={{ padding: '8rem 0', textAlign: 'center' }}>
      <div className="loading-spinner"></div>
      <p style={{ marginTop: '1rem', color: '#666' }}>Gathering the details...</p>
    </div>
  );
  
  if (!post) return (
    <div className="jm-container" style={{ padding: '8rem 0', textAlign: 'center' }}>
      <h2>404 - Story Not Found</h2>
      <p>We couldn't find the article you're looking for.</p>
      <Link to="/" className="back-link" style={{ marginTop: '2rem', display: 'inline-block' }}>
        <ArrowLeft size={16} /> Back to Homepage
      </Link>
    </div>
  );

  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);
  const shareUrl = window.location.href;

  return (
    <article className="post-page">
      <div className="post-header-wrap">
        <div className="jm-container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="sep-icon" />
            <Link to={`/category/${post.data.category?.toLowerCase()}`}>{post.data.category}</Link>
          </nav>

          <header className="post-header">
            <h1 className="post-title">{post.data.title}</h1>
            <p className="post-description">{post.data.description}</p>

            <div className="post-meta">
              <div className="meta-item">
                <User size={16} />
                <span>{post.data.author || 'Editorial Desk'}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>{new Date(post.data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>
        </div>
      </div>

      <div className="jm-container">
        <AdBanner zoneId="11004510" />
        <div className="post-layout">
          <main className="post-main">
            {post.data.image && (
              <figure className="post-hero-image">
                <img src={post.data.image} alt={post.data.imageAlt || post.data.title} />
                {post.data.imageCaption && <figcaption>{post.data.imageCaption}</figcaption>}
              </figure>
            )}

            <div className="post-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeSlug, rehypeAutolinkHeadings]}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <footer className="post-footer">
              {post.data.tags && post.data.tags.length > 0 && (
                <div className="post-tags">
                  {post.data.tags.map(tag => (
                    <Link key={tag} to={`/tags/${tag.toLowerCase()}`} className="tag-link">#{tag}</Link>
                  ))}
                </div>
              )}

              <div className="post-share">
                <h3>Share this story</h3>
                <div className="share-btns">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="share-btn fb" title="Share on Facebook">
                    <FacebookIcon size={20} />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.data.title)}`} target="_blank" rel="noreferrer" className="share-btn tw" title="Share on Twitter">
                    <TwitterIcon size={20} />
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="share-btn li" title="Share on LinkedIn">
                    <LinkedinIcon size={20} />
                  </a>
                  <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="share-btn copy" title="Copy Link">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </footer>
          </main>

          <aside className="post-sidebar">
            <div className="sticky-sidebar">
              {relatedPosts.length > 0 && (
                <div className="sidebar-widget">
                  <h3 className="widget-title">Related Stories</h3>
                  <div className="related-list">
                    {relatedPosts.map(p => (
                      <Link key={p.slug} to={`/posts/${p.slug}`} className="related-item">
                        <div className="related-img">
                          <img src={p.image || '/default-image.jpg'} alt={p.title} />
                        </div>
                        <div className="related-text">
                          <h4>{p.title}</h4>
                          <time>{new Date(p.date).toLocaleDateString()}</time>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="sidebar-widget newsletter-widget">
                <h3 className="widget-title">Subscribe</h3>
                <p>Get the latest news directly in your inbox.</p>
                <form className="sidebar-subscribe">
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit">Join Now</button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default Post;
