import React from 'react';
import { GetStaticProps } from 'next';
import { FaStar, FaCodeBranch } from 'react-icons/fa';
import Seo from '../components/Seo';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
}

interface ProjectsPageProps {
  repos: Repo[];
  /** True when the GitHub request failed and the list could not be built. */
  unavailable: boolean;
}

function Page({ repos, unavailable }: ProjectsPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <Seo
        title="Open Source"
        description="Public repositories and open-source work by Daniel Mesfin on GitHub."
        path="/projects"
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-paper-text dark:text-white mb-4">
          Open Source
        </h1>
        <p className="text-lg text-paper-muted dark:text-gray-300 max-w-2xl mx-auto">
          Public repositories from my GitHub, sorted by most recently updated.
        </p>
      </div>

      {unavailable || repos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-paper-muted dark:text-gray-400 mb-6">
            The repository list could not be loaded right now.
          </p>
          <a
            href="https://github.com/danmesfin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            View on GitHub
          </a>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex flex-col p-6 rounded-2xl border border-paper-border dark:border-gray-700 bg-paper-white dark:bg-zinc-900 hover:border-accent-coral hover:shadow-paper-hover transition-all duration-200"
              >
                <h2 className="text-lg font-bold text-paper-text dark:text-white mb-2 break-words">
                  {repo.name}
                </h2>
                <p className="text-sm text-paper-muted dark:text-gray-400 flex-1 line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm text-paper-muted dark:text-gray-400">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <FaStar aria-hidden="true" />
                    {repo.stars}
                    <span className="sr-only">stars</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch aria-hidden="true" />
                    {repo.forks}
                    <span className="sr-only">forks</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Built at deploy time and refreshed hourly. The previous version fetched on
// every request, which burned through GitHub's 60 req/hr unauthenticated
// limit and left the page throwing once it was exhausted.
export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  try {
    const res = await fetch(
      'https://api.github.com/users/danmesfin/repos?sort=updated&per_page=24',
      { headers: { Accept: 'application/vnd.github+json' } }
    );

    if (!res.ok) {
      throw new Error(`GitHub responded ${res.status}`);
    }

    const data = await res.json();
    const repos: Repo[] = (Array.isArray(data) ? data : [])
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description ?? null,
        htmlUrl: repo.html_url,
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        language: repo.language ?? null,
      }));

    return { props: { repos, unavailable: false }, revalidate: 3600 };
  } catch (error) {
    return { props: { repos: [], unavailable: true }, revalidate: 600 };
  }
};

export default Page;
