import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Use unpkg CDN for the workerSrc to avoid fetch errors in CRA
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const signatureTypes = [
  { label: "Simple Signature", value: "simple" },
  { label: "Digital Signature", value: "digital" },
];

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [signatureType, setSignatureType] = useState("simple");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPageNumber(1);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setPageNumber(1);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // UI before file selection
  if (!selectedFile) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-4">Sign PDF</h1>
        <p className="text-xl text-gray-500 text-center mb-8 max-w-2xl">
          Your tool to eSign documents. Sign a document yourself or send a signature request to others.
        </p>
        <div className="flex flex-col items-center">
          <div
            className="relative flex items-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <label htmlFor="pdf-upload" className="cursor-pointer select-none">
              <div className="bg-red-600 hover:bg-red-700 text-white text-2xl font-semibold px-16 py-5 rounded-2xl shadow-lg transition-all duration-200">
                Select PDF file
              </div>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <div className="flex flex-col ml-4 space-y-3">
              <button className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                {/* Google Drive SVG icon */}
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12.01 2l5.5 9.5-5.5 9.5-5.5-9.5L12.01 2zm0 2.236L7.236 11.5h9.548L12.01 4.236zm-4.774 8.264l4.774 8.264 4.774-8.264H7.236z"/></svg>
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                {/* Dropbox SVG icon */}
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M6.09 3.75L12 7.5l-5.91 3.75L0 7.5l6.09-3.75zm11.82 0L24 7.5l-6.09 3.75L12 7.5l5.91-3.75zM0 13.5l6.09-3.75L12 13.5l-5.91 3.75L0 13.5zm24 0l-6.09-3.75L12 13.5l5.91 3.75L24 13.5z"/></svg>
              </button>
            </div>
          </div>
          <p className="text-gray-500 mt-3">or drop PDF here</p>
        </div>
      </div>
    );
  }

  // UI after file selection
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* PDF Viewer Section */}
      <div className="flex-1 flex flex-col items-center justify-start p-8 overflow-auto">
        <div className="flex items-center mb-4 w-full max-w-2xl">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 mr-2"
          >
            &lt;
          </button>
          <span className="mx-2">{pageNumber} / {numPages}</span>
          <button
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 ml-2"
          >
            &gt;
          </button>
          <span className="ml-4 font-medium">{selectedFile.name}</span>
        </div>
        <div className="border rounded shadow bg-white w-full max-w-2xl flex flex-col items-center">
          <Document
            file={selectedFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="p-8">Loading PDF...</div>}
            className="w-full flex flex-col items-center"
          >
            <Page pageNumber={pageNumber} width={700} />
          </Document>
        </div>
      </div>
      {/* Signing Options Panel */}
      <div className="w-full max-w-sm bg-white border-l shadow-lg flex flex-col p-8">
        <h2 className="text-2xl font-bold mb-6">Signing options</h2>
        <div className="mb-6">
          <div className="flex gap-4 mb-2">
            {signatureTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSignatureType(type.value)}
                className={`flex-1 flex flex-col items-center border-2 rounded-lg py-3 transition-all duration-150 ${signatureType === type.value ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
              >
                <span className="text-lg font-semibold mb-1">{type.label}</span>
                {/* Simple icons for now */}
                {type.value === "simple" ? (
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M4 28c4-8 8-8 12 0 4-8 8-8 12 0" stroke="#ef4444" strokeWidth="2" fill="none"/></svg>
                ) : (
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" stroke="#a3a3a3" strokeWidth="2" fill="none"/><path d="M10 18l4 4 8-8" stroke="#a3a3a3" strokeWidth="2" fill="none"/></svg>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-gray-700 font-semibold mb-2">Required fields</div>
          <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
            <span className="mr-2">✒️</span>
            <span className="font-signature text-lg">Mrunal Gaikwad</span>
            <button className="ml-auto text-gray-400 hover:text-gray-600"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="2"/></svg></button>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-gray-700 font-semibold mb-2">Optional fields</div>
          <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
            <span className="mr-2">AC</span>
            <span className="font-signature text-lg">MG</span>
          </div>
          <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
            <span className="mr-2">🔤</span>
            <span className="font-signature text-lg">Name</span>
          </div>
          <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
            <span className="mr-2">📅</span>
            <span className="font-signature text-lg">Date</span>
          </div>
        </div>
        <button className="mt-auto bg-red-300 hover:bg-red-400 text-white text-xl font-semibold py-4 rounded-xl flex items-center justify-center transition-all duration-200">
          Sign <span className="ml-2">➔</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
