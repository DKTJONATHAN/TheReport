// scripts/index-posts.js
import { execSync } from 'child_process';
import path from 'path';

const INDEXJUMP_TOKEN = process.env.INDEXJUMP_TOKEN;
const SITE_URL = process.env.SITE_URL || 'https://jonathanmwaniki.co.ke';
const CF_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function purgeCloudflareCache(url) {
  if (!CF_ZONE_ID || !CF_API_TOKEN) return;
  
  console.log(`☁️  Purging Cloudflare cache for: ${url}`);
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CF_API_TOKEN}`
      },
      body: JSON.stringify({ files: [url] })
    });
    
    if (response.ok) {
      console.log(`✅ Cloudflare cache purged for: ${url}`);
    } else {
      const result = await response.json();
      console.warn(`⚠️ Cloudflare purge failed: ${JSON.stringify(result.errors)}`);
    }
  } catch (error) {
    console.error(`❌ Cloudflare purge error: ${error.message}`);
  }
}

async function runIndexer() {
  if (!INDEXJUMP_TOKEN) {
    console.warn('⚠️ INDEXJUMP_TOKEN environment variable is missing. Skipping indexing.');
    return;
  }

  console.log('🔍 Checking for new posts...');

  try {
    // Use diff-tree to gracefully handle shallow clones (like Cloudflare Pages)
    const gitOutput = execSync('git diff-tree --no-commit-id --name-only -r HEAD', { 
      encoding: 'utf8'
    }).trim();
    
    if (!gitOutput) {
      console.log('📝 No changes detected');
      return;
    }
    
    const changedFiles = gitOutput.split('\n');
    const newPostFiles = changedFiles.filter(file => 
      file.includes('src/content/posts/') && file.endsWith('.md')
    );
    
    if (newPostFiles.length === 0) {
      console.log('📝 No new posts found');
      return;
    }
    
    console.log(`🚀 Found ${newPostFiles.length} new posts, submitting...`);
    
    for (const file of newPostFiles) {
      const slug = path.basename(file, '.md').toLowerCase(); // Convert slug to lowercase
      const url = `${SITE_URL}/posts/${slug}`;
      
      // Purge Cloudflare cache before indexing
      await purgeCloudflareCache(url);

      try {
        const indexUrl = `https://api.indexjump.com/index?url=${encodeURIComponent(url)}&token=${INDEXJUMP_TOKEN}`;
        const response = await fetch(indexUrl);
        
        if (response.ok) {
          console.log(`✅ Indexed: ${url}`);
        } else {
          const result = await response.text();
          console.log(`❌ Failed: ${url} - ${result}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.log(`❌ Error: ${url} - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.log('⚠️  Git error:', error.message);
  }
}

runIndexer().catch(err => {
  console.error('⚠️ Unexpected error during indexing:', err.message);
});