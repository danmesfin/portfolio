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
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
      <Seo
        title="Open Source"
        description="Public repositories and open-source work by Daniel Mesfin on GitHub."
        path="/projects"
      />

      <p className="eyebrow">Open source</p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper-text dark:text-paper-white">
        Public repositories.
      </h1>
      <p className="mt-6 max-w-2xl text-paper-muted dark:text-gray-400 leading-relaxed">
        Pulled from my GitHub, sorted by most recently updated.
      </p>
      <hr className="rule mt-10" />

      {unavailable || repos.length === 0 ? (
        <div className="py-16">
          <p className="font-mono text-sm text-paper-muted dark:text-gray-400 mb-6">
            The repository list could not be loaded right now.
          </p>
          <a
            href="https://github.com/danmesfin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink"
          >
            View on GitHub
          </a>
        </div>
      ) : (
        <ul className="divide-y divide-paper-border dark:divide-white/10">
          {repos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-8 gap-y-2 py-6"
              >
                <div className="min-w-0">
                  <h2 className="font-display text-xl text-paper-text dark:text-paper-white group-hover:underline decoration-1 underline-offset-4 break-words">
                    {repo.name}
                  </h2>
                  <p className="mt-2 max-w-xl font-mono text-sm text-paper-muted dark:text-gray-400 line-clamp-2">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-5 font-mono text-xs text-paper-muted dark:text-gray-500">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1.5">
                    <FaStar aria-hidden="true" />
                    {repo.stars}
                    <span className="sr-only">stars</span>
                  </span>
                  <span className="flex items-center gap-1.5">
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
