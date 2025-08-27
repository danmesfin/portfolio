import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  timeline: string;
  liveUrl?: string;
  images: string[];
  content: string;
  excerpt: string;
}

export function getCaseStudies(): CaseStudy[] {
  const caseStudiesDirectory = path.join(process.cwd(), 'content/projects-case-study');
  
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(caseStudiesDirectory);
  const caseStudies = filenames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const fullPath = path.join(caseStudiesDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const slug = name.replace(/\.md$/, '');
      
      // Extract title from first h1 in content
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : slug;
      
      // Extract description from Project Overview section
      const overviewMatch = content.match(/## Project Overview\s*\n\s*\*\*.*?\*\*\s+(.+?)(?=\n\n|\n###)/);
      const description = overviewMatch ? overviewMatch[1].trim() : '';
      
      // Extract technologies from the content
      const techMatch = content.match(/\*\*Technology Stack\*\*:\s*(.+?)(?=\n|$)/);
      const techFromContent = techMatch ? techMatch[1].split(',').map(t => t.trim()) : [];
      
      // Also look for technologies in code blocks or lists
      const techListMatch = content.match(/\*\*Technologies Used\*\*:\s*(.+?)(?=\n\n|\*\*|$)/);
      const techFromList = techListMatch ? 
        techListMatch[1].split(',').map(t => t.trim().replace(/\*/g, '')) : [];
      
      const techSet = new Set([...techFromContent, ...techFromList]);
      const technologies = Array.from(techSet).filter(Boolean);
      
      // Extract role
      const roleMatch = content.match(/\*\*Role\*\*:\s*(.+?)(?=\n|$)/);
      const role = roleMatch ? roleMatch[1] : 'Full-Stack Developer';
      
      // Extract timeline
      const timelineMatch = content.match(/\*\*Development Timeline\*\*:\s*(.+?)(?=\n|$)/);
      const timeline = timelineMatch ? timelineMatch[1] : 'Multi-phase development';
      
      // Extract live URL
      const urlMatch = content.match(/\[.*?\]\((https?:\/\/[^\)]+)\)/);
      const liveUrl = urlMatch ? urlMatch[1] : undefined;
      
      // Get project images
      const projectImagesPath = path.join(process.cwd(), 'public/images/projects', slug);
      let images: string[] = [];
      
      if (fs.existsSync(projectImagesPath)) {
        const imageFiles = fs.readdirSync(projectImagesPath);
        images = imageFiles
          .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
          .map(file => `/images/projects/${slug}/${file}`);
      }
      
      // Create excerpt (first 200 characters of description)
      const excerpt = description.length > 200 ? 
        description.substring(0, 200) + '...' : description;

      return {
        slug,
        title,
        description,
        technologies,
        role,
        timeline,
        liveUrl,
        images,
        content,
        excerpt,
        ...data
      };
    });

  return caseStudies;
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const caseStudies = getCaseStudies();
  return caseStudies.find(study => study.slug === slug) || null;
}
