// /src/data/post.ts
import { type CollectionEntry, getCollection } from "astro:content";

export type Post = CollectionEntry<"posts">;

/**
 * Get all published posts
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection("posts");
  
  return posts.filter(post => {
    // Filter out draft posts in production
    if (import.meta.env.PROD && post.data.draft) {
      return false;
    }
    return true;
  });
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.data.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.data.featured === true);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.data.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get related posts based on tags and category
 */
export async function getRelatedPosts(currentPost: Post, limit: number = 3): Promise<Post[]> {
  const allPosts = await getAllPosts();
  
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
  
  // Score posts based on shared tags and category
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets high score
    if (post.data.category === currentPost.data.category) {
      score += 3;
    }
    
    // Shared tags get points
    const sharedTags = post.data.tags?.filter(tag => 
      currentPost.data.tags?.includes(tag)
    ) || [];
    score += sharedTags.length;
    
    return { post, score };
  });
  
  // Sort by score and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

/**
 * Get all unique tags from posts
 */
export async function getUniqueTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const allTags = allPosts.flatMap(post => post.data.tags || []);
  const uniqueTags = [...new Set(allTags)].sort();
  return uniqueTags;
}

/**
 * Group posts by year
 */
export async function groupPostsByYear(): Promise<Record<number, Post[]>> {
  const allPosts = await getAllPosts();
  const postsByYear: Record<number, Post[]> = {};
  
  allPosts.forEach(post => {
    const year = new Date(post.data.publishDate).getFullYear();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });
  
  return postsByYear;
}

/**
 * Get tag metadata including post count
 */
export async function getTagMeta(): Promise<Array<{ name: string; count: number }>> {
  const allPosts = await getAllPosts();
  const tagCounts: Record<string, number> = {};
  
  // Count posts for each tag
  allPosts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  // Convert to array and sort by count (descending)
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}