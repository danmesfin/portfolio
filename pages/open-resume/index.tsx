import React from 'react';
// import PDF from '../../public/downloads/Daniel_Mesfin.pdf';

function Page() {
  const resumePdfPath = "/downloads/Daniel_Mesfin.pdf'";

  const downloadResume = () => {
    // Trigger download
    const link = document.createElement('a');
    link.href = resumePdfPath;
    link.download = '/downloads/Daniel_Mesfin.pdf';
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:flex-row">
      <div className="w-full lg:w-1/2 lg:mr-8">
        <h1 className="text-2xl lg:text-4xl mb-4">Your Resume</h1>
        <p className="mb-4">
          This is where you can view and download my resume in PDF format.
        </p>

        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={downloadResume}
        >
          Download Resume PDF
        </button>
      </div>

      <iframe
        src={resumePdfPath}
        title="Resume PDF"
        className="w-full lg:w-1/2 h-64 lg:h-96 border-none mt-8 lg:mt-0"
      />
    </div>
  );
}

export default Page;
