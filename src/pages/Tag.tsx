import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

const Tag: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: tag ? `#${tag} | The Report` : 'Tag | The Report',
    description: `Browse all articles tagged with #${tag} on The Report.`
  });

  useEffect(() => {
    fetch('/posts-manifest.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((p: any) => 
          p.tags?.some((t: string) => t.toLowerCase() === tag?.toLowerCase())
        );
        setPosts(filtered);
        setLoading(false);
      });
  }, [tag]);

  if (loading) return <div className="jm-container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading stories...</div>;

  return (
    <div className="jm-home-wrapper">
      <div className="jm-container" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <h1 style={{ fontSize: '2rem' }}>Stories tagged #{tag}</h1>
        </div>
        
        <div className="feed-grid">
          {posts.map(post => (
            <article className="feed-card fade-in" key={post.slug}>
              <Link to={`/posts/${post.slug}`} className="feed-card-link">
                <div className="feed-card-img">
                  <img src={post.image || '/default-image.jpg'} alt={post.title} />
                </div>
                <div className="feed-card-body">
                  <h3 className="feed-card-title">{post.title}</h3>
                  <p className="feed-card-desc">{post.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tag;
