export default {
  siteTitle: "My Astro Blog",
  frontmatter: {
    requiredFields: ['title', 'date', 'description'],
    optionalFields: [
      'author',
      'image',
      'imageAlt',
      'imageCaption',
      'category',
      'tags',
      'featured',
      'draft'
    ]
  }
}