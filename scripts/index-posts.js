// scripts/index-posts.js
import { execSync } from 'child_process';
import path from 'path';

const INDEXJUMP_TOKEN = process.env.INDEXJUMP_TOKEN;
const SITE_URL = process.env.SITE_URL || 'https://jonathanmwaniki.co.ke';

if (!INDEXJUMP_TOKEN) {
  console.log('❌ INDEXJUMP_TOKEN environment variable is required');
  process.exit(1);
}

console.log('🔍 Checking for new posts...');

try {
  const gitOutput = execSync('git diff --name-only HEAD~1 HEAD', { 
    encoding: 'utf8'
  }).trim();
  
  if (!gitOutput) {
    console.log('📝 No changes detected');
    process.exit(0);
  }
  
  const changedFiles = gitOutput.split('\n');
  const newPostFiles = changedFiles.filter(file => 
    file.includes('src/content/posts/') && file.endsWith('.md')
  );
  
  if (newPostFiles.length === 0) {
    console.log('📝 No new posts found');
    process.exit(0);
  }
  
  console.log(`🚀 Found ${newPostFiles.length} new posts, submitting...`);
  
  for (const file of newPostFiles) {
    const slug = path.basename(file, '.md').toLowerCase(); // Convert slug to lowercase
    const url = `${SITE_URL}/posts/${slug}`;
    
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