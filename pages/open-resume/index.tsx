import React from 'react';
import Seo from '../../components/Seo';

const RESUME_PATH = '/downloads/Daniel_Mesfin.pdf';

function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Seo
        title="Resume"
        description="View and download the resume of Daniel Mesfin, full-stack developer based in Addis Ababa."
        path="/open-resume"
      />
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h1 className="text-3xl lg:text-4xl font-display mb-4 text-paper-text dark:text-white">
            My Resume
          </h1>
          <p className="mb-6 text-paper-muted dark:text-gray-300">
            View the resume inline, or download a PDF copy.
          </p>

          <a
            href={RESUME_PATH}
            download
            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Download PDF
          </a>
        </div>

        <iframe
          src={RESUME_PATH}
          title="Resume of Daniel Mesfin"
          className="w-full lg:w-2/3 h-[70vh] rounded-xl border border-paper-border dark:border-gray-700 bg-white"
        />
      </div>
    </div>
  );
}

export default Page;
