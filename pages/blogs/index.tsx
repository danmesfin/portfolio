import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllBlogs, BlogData } from '../../utils/getBlogs';

interface BlogIndexProps {
  blogs: BlogData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ blogs }) => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
            <a>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={blog.frontmatter.preview}
                  alt={blog.frontmatter.title}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-semibold">
                  {blog.frontmatter.title}
                </h2>
                <p className="text-gray-600 text-sm">{blog.frontmatter.date}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const blogs = getAllBlogs();

  return {
    props: {
      blogs,
    },
  };
};

export default BlogIndex;
