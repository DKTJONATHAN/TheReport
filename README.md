# The Mwaniki's Report - Professional News Website

A modern, professional news website built with Astro, featuring a clean red and white design with Tailwind CSS.

## 🚀 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   ├── Jonathan-Mwaniki-logo.png
│   └── images/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── config.ts
│   │   └── posts/
│   │       └── example.md
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── contact.astro
│       └── posts/
│           └── [...slug].astro
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── README.md
```

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Your logo file (`Jonathan-Mwaniki-logo.png`) in the `public/` folder
- Favicon files in the `public/` folder

## 🛠️ Installation

1. **Clone or create your project directory**
   ```bash
   mkdir the-mwanikis-report
   cd the-mwanikis-report
   ```

2. **Install Astro and dependencies**
   ```bash
   npm create astro@latest . -- --template minimal --typescript
   npm install @astrojs/tailwind tailwindcss @tailwindcss/typography
   ```

3. **Copy the provided files into your project structure**
   - Replace the contents of each file with the code provided
   - Ensure your logo (`Jonathan-Mwaniki-logo.png`) is in the `public/` folder

4. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Project

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Creating Blog Posts

Create new markdown files in `src/content/posts/` with the following frontmatter structure:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: 2025-08-07
author: "Jonathan Mwaniki"
category: "Business"
image: "/images/your-image.jpg"
tags: ["tag1", "tag2", "tag3"]
featured: false
---

Your post content goes here...
```

### Required Frontmatter Fields:
- `title`: The post title
- `description`: Post description/excerpt
- `date`: Publication date (YYYY-MM-DD format)

### Optional Frontmatter Fields:
- `author`: Author name (defaults to "Jonathan Mwaniki")
- `category`: Post category
- `image`: Featured image path (relative to public folder)
- `tags`: Array of tags
- `featured`: Set to `true` to make it the hero post

## 🎨 Design Features

- **Professional Layout**: Clean, modern design with red and white color scheme
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards
- **Fast Loading**: Static site generation with Astro
- **Content Management**: Markdown-based blog posts with frontmatter
- **Social Integration**: Twitter sharing and links

## 📱 Key Pages

- **Home (`/`)**: Featured post hero + latest news grid
- **About (`/about`)**: Professional about page with mission and values
- **Contact (`/contact`)**: Contact form and social links
- **Posts (`/posts/[slug]`)**: Individual blog post pages

## 🔧 Customization

### Colors
The site uses a red and white color scheme. To modify colors, edit `tailwind.config.mjs`:

```javascript
colors: {
  red: {
    // Customize red shades here
  }
}
```

### Logo
Replace `public/Jonathan-Mwaniki-logo.png` with your logo file (keep the same filename or update references in the code).

### Site Information
Update the following in your files:
- Site title: "The Mwaniki's Report"
- Domain: "jonathanmwaniki.co.ke"
- Twitter: "@maestropuns"

## 📊 Content Strategy

### Post Categories
Consider organizing posts into categories like:
- Business & Economics
- Technology
- Politics & Governance
- Social Issues
- Analysis & Opinion

### SEO Best Practices
- Use descriptive titles (50-60 characters)
- Write compelling descriptions (150-160 characters)
- Include relevant tags
- Add alt text to images
- Use proper heading hierarchy (H1, H2, H3)

## 🚀 Deployment

The site can be deployed to various platforms:

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Connect your repository to Vercel
```

### Traditional Hosting
```bash
npm run build
# Upload contents of dist/