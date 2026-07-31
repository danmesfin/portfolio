import React from 'react';
import Seo from '../../components/Seo';

const RESUME_PATH = '/downloads/Daniel_Mesfin_Resume.pdf';

function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Seo
        title="Resume"
        description="View and download the resume of Daniel Mesfin, full-stack developer based in Addis Ababa."
        path="/open-resume"
      />
      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <p className="eyebrow">Résumé</p>
          <h1 className="font-display mt-4 text-3xl lg:text-4xl text-paper-text dark:text-paper-white">
            Curriculum vitae.
          </h1>
          <p className="mt-5 text-paper-muted dark:text-gray-400 leading-relaxed">
            View it inline, or download a PDF copy.
          </p>

          <a href={RESUME_PATH} download className="btn-ink mt-8">
            Download PDF
          </a>
        </div>

        <iframe
          src={RESUME_PATH}
          title="Resume of Daniel Mesfin"
          className="w-full lg:w-2/3 h-[75vh] border border-paper-border dark:border-white/10 bg-white"
        />
      </div>
    </div>
  );
}

export default Page;
