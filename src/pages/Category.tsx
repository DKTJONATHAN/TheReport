import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: category ? `${category.charAt(0).toUpperCase() + category.slice(1)} | The Report` : 'Category | The Report',
    description: `Browse all articles in the ${category} category on The Report.`
  });

  useEffect(() => {
    fetch('/posts-manifest.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((p: any) => 
          p.category?.toLowerCase() === category?.toLowerCase()
        );
        setPosts(filtered);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div className="jm-container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading stories...</div>;

  return (
    <div className="jm-home-wrapper">
      <div className="jm-container" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <h1 style={{ fontSize: '2rem', textTransform: 'capitalize' }}>{category}</h1>
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

export default Category;
