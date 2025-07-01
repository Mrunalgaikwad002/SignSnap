import React from "react";

const DownloadButton = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 mt-2"
  >
    Download Signed PDF
  </button>
);

export default DownloadButton; 