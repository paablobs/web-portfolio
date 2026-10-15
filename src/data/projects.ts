import webPortfolioImage from '../assets/Webportoflio.png'
import noutImage from '../assets/nout.png'
import sabotetrisImage from '../assets/Tetris.png'
import whatDayImage from '../assets/whatday.png'

export const projects = [
  {
    slug: 'web-portfolio', title: 'Web Portfolio',
    descKey: 'work.webPortfolioDescription', altKey: 'work.webPortfolioImageAlt',
    stack: ['Astro', 'React', 'TypeScript', 'SCSS'], image: webPortfolioImage,
    codeUrl: 'https://github.com/paablobs/web-portfolio', liveUrl: 'https://paablobs.github.io/web-portfolio/',
  },
  {
    slug: 'nout', title: 'Nout',
    descKey: 'work.noutDescription', altKey: 'work.noutImageAlt',
    stack: ['React', 'TypeScript', 'Vite', 'TipTap', 'Firebase', 'MUI'], image: noutImage,
    codeUrl: 'https://github.com/paablobs/Nout', liveUrl: 'https://nout.it',
  },
  {
    slug: 'sabotetris', title: 'Sabotetris',
    descKey: 'work.sabotetrisDescription', altKey: 'work.sabotetrisImageAlt',
    stack: ['TypeScript', 'Canvas', 'Vite'], image: sabotetrisImage,
    codeUrl: 'https://github.com/paablobs/sabotetris', liveUrl: 'https://paablobs.github.io/sabotetris/',
  },
  {
    slug: 'what-day-is-next', title: 'What Day Is Next?',
    descKey: 'work.whatDayIsNextDescription', altKey: 'work.whatDayIsNextImageAlt',
    stack: ['React', 'TypeScript', 'Chakra UI', 'Vite'], image: whatDayImage,
    codeUrl: 'https://github.com/paablobs/whatdayisnext', liveUrl: 'https://paablobs.github.io/whatdayisnext/',
  },
]
