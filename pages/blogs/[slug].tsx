import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { getBlogs, Blog } from '../../utils/getBlogs';

interface BlogPostProps {
  blog: Blog;
}

const BlogPost: React.FC<BlogPostProps> = ({ blog }) => {
  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getBlogs();
  const paths = blogs.map((blog) => ({ params: { slug: blog.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug === params.slug);
  return { props: { blog } };
};

export default BlogPost;
