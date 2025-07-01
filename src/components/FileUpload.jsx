import React from "react";

const FileUpload = ({ onFileChange, selectedFile }) => (
  <div className="flex flex-col items-center">
    <input
      type="file"
      accept="application/pdf"
      onChange={onFileChange}
      className="mb-2"
    />
    {selectedFile && (
      <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
    )}
  </div>
);

export default FileUpload; 