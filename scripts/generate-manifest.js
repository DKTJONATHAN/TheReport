import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');
const outputFile = path.join(process.cwd(), 'public/posts-manifest.json');

function generateManifest() {
  const files = fs.readdirSync(postsDirectory);
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      const slug = file.replace(/\.md$/, '');

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        category: data.category,
        tags: data.tags,
        image: data.image,
        author: data.author,
        featured: data.featured,
        draft: data.draft,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  
  // Copy markdown files to public/posts for runtime fetching
  const publicPostsDir = path.join(process.cwd(), 'public/posts');
  if (!fs.existsSync(publicPostsDir)) {
    fs.mkdirSync(publicPostsDir, { recursive: true });
  }

  files.forEach(file => {
    if (file.endsWith('.md')) {
      fs.copyFileSync(
        path.join(postsDirectory, file),
        path.join(publicPostsDir, file)
      );
    }
  });

  console.log(`✅ Generated manifest with ${posts.length} posts and copied files to public/posts.`);
}

generateManifest();
