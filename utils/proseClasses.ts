/**
 * Editorial long-form styling for rendered markdown — serif headings, mono
 * body, hairline rules, flat code. Shared by the blog post and case-study
 * pages so both read identically. Uses `[&>…]` child selectors, which match
 * both html-react-parser and react-markdown output.
 */
const proseClasses = [
  'font-mono text-[0.95rem] text-paper-text dark:text-gray-300 leading-relaxed',
  '[&>h1]:font-display [&>h1]:font-normal [&>h1]:text-3xl [&>h1]:text-paper-text dark:[&>h1]:text-paper-white [&>h1]:mb-6 [&>h1]:mt-12 [&>h1]:first:mt-0',
  '[&>h2]:font-display [&>h2]:font-normal [&>h2]:text-2xl [&>h2]:text-paper-text dark:[&>h2]:text-paper-white [&>h2]:mb-4 [&>h2]:mt-12',
  '[&>h3]:font-display [&>h3]:font-normal [&>h3]:text-xl [&>h3]:text-paper-text dark:[&>h3]:text-paper-white [&>h3]:mb-3 [&>h3]:mt-8',
  '[&>p]:mb-6 [&>p]:leading-relaxed',
  '[&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-6',
  '[&>ol]:mb-6 [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6',
  '[&_li]:leading-relaxed',
  '[&_a]:text-paper-text dark:[&_a]:text-paper-white [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2 hover:[&_a]:decoration-transparent',
  '[&>blockquote]:border-l-2 [&>blockquote]:border-paper-text dark:[&>blockquote]:border-white/40 [&>blockquote]:pl-6 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-paper-muted dark:[&>blockquote]:text-gray-400',
  '[&_code]:bg-paper-cream dark:[&_code]:bg-white/10 [&_code]:border [&_code]:border-paper-border dark:[&_code]:border-white/15 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm',
  '[&>pre]:bg-paper-text dark:[&>pre]:bg-white/5 [&>pre]:text-paper-white dark:[&>pre]:text-gray-200 [&>pre]:p-6 [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:border [&>pre]:border-paper-border dark:[&>pre]:border-white/10 [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0',
  '[&>hr]:my-10 [&>hr]:border-paper-border dark:[&>hr]:border-white/10',
  '[&>table]:w-full [&>table]:my-6 [&>table]:text-sm [&_th]:text-left [&_th]:border-b [&_th]:border-paper-border dark:[&_th]:border-white/15 [&_th]:py-2 [&_th]:pr-4 [&_td]:py-2 [&_td]:pr-4 [&_td]:border-b [&_td]:border-paper-border/50 dark:[&_td]:border-white/5',
].join(' ');

export default proseClasses;
