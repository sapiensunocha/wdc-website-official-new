// Import some images from your assets folder so it doesn't crash
import case1 from '../images/cases/case1.jpeg';
import case2 from '../images/cases/case2.jpeg';

export const caseStudies = [
  {
    title: "Global Disaster Alert System",
    description: "Deploying Michael AI for real-time flood and earthquake monitoring.",
    image: case1,
    link: "/cases/Michael",
    coming_soon: false,
  },
  {
    title: "Lifeline Fund Distribution",
    description: "Transparent, rapid disaster relief funds for vulnerable communities.",
    image: case2,
    link: "/cases/lifeline",
    coming_soon: true,
  }
];