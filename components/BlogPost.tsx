import React from 'react';
import parse from 'html-react-parser';

interface BlogPostProps {
  frontmatter: {
    title: string;
    date: string; // Change the type according to your date format
    preview: string;
  };
  markdownBody: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ frontmatter, markdownBody }) => {
  console.log(markdownBody);
  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
      <p className="text-gray-600 mb-4">{frontmatter.date}</p>
      <img
        src={frontmatter.preview}
        alt={frontmatter.title}
        className="w-full h-64 object-cover mb-4 rounded-md"
      />
      <div className="pose">{parse(markdownBody)}</div>
    </div>
  );
};

export default BlogPost;
