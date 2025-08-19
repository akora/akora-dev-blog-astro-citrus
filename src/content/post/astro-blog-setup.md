---
title: "Setting Up a Developer Blog with Astro and Citrus Theme"
description: "A complete guide to creating a fast, modern blog using Astro and the beautiful Citrus theme"
publishDate: "2025-01-19"
tags: ["astro", "blogging", "tutorial", "web-development"]
---

# Setting Up a Developer Blog with Astro and Citrus Theme

Building a developer blog has never been easier with modern static site generators. In this post, I'll walk you through setting up a beautiful, fast blog using Astro and the elegant Citrus theme.

## Why Astro?

Astro stands out in the static site generator landscape for several reasons:

- **Zero JavaScript by default** - Ships minimal JS, loads incredibly fast
- **Component agnostic** - Use React, Vue, Svelte, or plain HTML
- **Built-in optimizations** - Image optimization, code splitting, and more
- **Developer experience** - Hot reloading, TypeScript support, and great tooling

## The Citrus Theme

The Citrus theme brings:
- Clean, modern design
- Dark/light mode toggle
- Responsive layout
- SEO optimization
- RSS feed generation
- Sitemap generation

## Setup Process

### 1. Clone and Install

```bash
git clone https://github.com/ArtemKutsan/astro-citrus.git my-blog
cd my-blog
pnpm install
```

### 2. Configuration

Update `src/site.config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  author: "Your Name",
  description: "Your blog description",
  title: "Your Blog Title",
  // ... other config
};
```

### 3. Domain Setup

In `astro.config.ts`, update the site URL:

```typescript
export default defineConfig({
  site: "https://yourdomain.com/",
  // ... other config
});
```

### 4. Content Creation

Create your first post in `src/content/post/`:

```markdown
---
title: "My First Post"
description: "Getting started with my new blog"
publishDate: "2025-01-19"
tags: ["blogging", "first-post"]
---

# Welcome to my blog!

This is my first post...
```

## Development Workflow

Start the development server:

```bash
pnpm dev
```

Your blog will be available at `http://localhost:4321` with hot reloading enabled.

## Deployment

The theme comes with Netlify configuration out of the box. Simply:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy automatically on every push

## Customization Tips

- Modify colors in `tailwind.config.ts`
- Add custom components in `src/components/`
- Extend layouts in `src/layouts/`
- Configure plugins in `astro.config.ts`

## Conclusion

Astro with the Citrus theme provides an excellent foundation for a developer blog. The combination of performance, developer experience, and beautiful design makes it an ideal choice for sharing your knowledge with the world.

Happy blogging!
