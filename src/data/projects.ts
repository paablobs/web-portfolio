import webPortfolioImage from '../assets/Webportoflio.png'
import noutImage from '../assets/nout.png'
import nimvoImage from '../assets/nimvo.png'
import sabotetrisImage from '../assets/Tetris.png'
import whatDayImage from '../assets/whatday.png'

// Preserve existing detail URLs even when a project is no longer featured.
export const projects = [
  {
    slug: 'nout', title: 'Nout', featured: true,
    descKey: 'work.noutDescription', altKey: 'work.noutImageAlt',
    stack: ['React', 'TypeScript', 'Firestore', 'TipTap', 'Vitest', 'Playwright'], image: noutImage,
    codeUrl: 'https://github.com/paablobs/Nout', liveUrl: 'https://nout.it',
  },
  {
    slug: 'nimvo', title: 'Nimvo', featured: true,
    descKey: 'work.nimvoDescription', altKey: 'work.nimvoImageAlt',
    stack: ['React', 'TypeScript', 'SQLite / WASM', 'Web Workers', 'Web Crypto', 'Playwright'], image: nimvoImage,
    codeUrl: 'https://github.com/paablobs/nimvo', liveUrl: 'https://paablobs.github.io/nimvo/',
  },
  {
    slug: 'sabotetris', title: 'Sabotetris', featured: true,
    descKey: 'work.sabotetrisDescription', altKey: 'work.sabotetrisImageAlt',
    stack: ['React', 'TypeScript', 'Excalibur.js', 'Supabase', 'PostgreSQL', 'Edge Functions'], image: sabotetrisImage,
    codeUrl: 'https://github.com/paablobs/sabotetris', liveUrl: 'https://paablobs.github.io/sabotetris/',
  },
  {
    slug: 'web-portfolio', title: 'Web Portfolio', featured: true,
    descKey: 'work.webPortfolioDescription', altKey: 'work.webPortfolioImageAlt',
    stack: ['Astro', 'React', 'TypeScript', 'SCSS Modules', 'Vitest', 'GitHub Actions'], image: webPortfolioImage,
    codeUrl: 'https://github.com/paablobs/web-portfolio', liveUrl: 'https://paablobs.github.io/web-portfolio/',
  },
  {
    slug: 'what-day-is-next', title: 'What Day Is Next?', featured: false,
    descKey: 'work.whatDayIsNextDescription', altKey: 'work.whatDayIsNextImageAlt',
    stack: ['React', 'TypeScript', 'Chakra UI', 'Vite'], image: whatDayImage,
    codeUrl: 'https://github.com/paablobs/whatdayisnext', liveUrl: 'https://paablobs.github.io/whatdayisnext/',
  },
]

export const featuredProjects = projects.filter(project => project.featured)

export const caseStudySections = ['problem', 'architecture', 'decisions', 'quality', 'limitations'] as const
