// src/pages/api/index-posts.js
import { execSync } from 'child_process';
import path from 'path';

const INDEXJUMP_TOKEN = process.env.INDEXJUMP_TOKEN;
const SITE_URL = process.env.SITE_URL || 'https://yoursite.com';

// Get posts from the latest commit only
function getNewPostsFromCommit() {
  try {
    // Get files changed in the last commit
    const gitOutput = execSync('git diff-tree --name-only --no-commit-id HEAD', { 
      encoding: 'utf8',
      cwd: process.cwd() 
    }).trim();
    
    if (!gitOutput) {
      return [];
    }
    
    const changedFiles = gitOutput.split('\n');
    
    // Filter for new markdown files in posts directory
    const newPostFiles = changedFiles.filter(file => 
      file.includes('src/content/posts/') && 
      file.endsWith('.md')
    );
    
    return newPostFiles.map(file => {
      const filename = path.basename(file, '.md');
      return { slug: filename };
    });
    
  } catch (error) {
    console.error('Error getting posts from git:', error);
    return [];
  }
}

async function submitUrlToIndexJump(url) {
  try {
    const indexUrl = `https://api.indexjump.com/index?url=${encodeURIComponent(url)}&token=${INDEXJUMP_TOKEN}`;
    
    const response = await fetch(indexUrl);
    const result = await response.text();
    
    return {
      url,
      success: response.ok,
      status: response.status,
      result: result
    };
  } catch (error) {
    return {
      url,
      success: false,
      error: error.message
    };
  }
}

export async function POST() {
  if (!INDEXJUMP_TOKEN) {
    return new Response(JSON.stringify({ 
      error: 'INDEXJUMP_TOKEN not configured' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Get posts from the latest commit
    const newPosts = getNewPostsFromCommit();
    
    if (newPosts.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'No new posts in this commit',
        submitted: 0
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Submit each URL to IndexJump
    const results = [];
    
    for (const post of newPosts) {
      const url = `${SITE_URL}/posts/${post.slug}`;
      const result = await submitUrlToIndexJump(url);
      results.push(result);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return new Response(JSON.stringify({
      message: `Submitted ${newPosts.length} new posts to IndexJump`,
      submitted: newPosts.length,
      successful,
      failed,
      results
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in index-posts API:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}