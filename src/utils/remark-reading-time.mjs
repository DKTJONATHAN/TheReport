// src/utils/remark-reading-time.mjs
export function remarkReadingTime() {
  return (tree, { data }) => {
    const textContent = tree.children
      .filter(node => node.type === 'paragraph')
      .map(p => p.children.map(child => child.value).join(' '))
      .join(' ');
    
    const words = textContent.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    
    data.astro.frontmatter.readingTime = `${minutes} min read`;
  };
}