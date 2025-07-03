import React, { useState } from "react";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const signatureFonts = [
  { label: "Great Vibes", font: "'Great Vibes', cursive" },
  { label: "Dancing Script", font: "'Dancing Script', cursive" },
  { label: "Sacramento", font: "'Sacramento', cursive" },
  { label: "Alex Brush", font: "'Alex Brush', cursive" },
];

const colors = ["#222", "#d32f2f", "#1976d2", "#388e3c"];

const SignatureDetailsModal = ({
  open,
  onClose,
  fullName,
  initials,
  setFullName,
  setInitials,
  signatureStyle,
  setSignatureStyle,
  signatureColor,
  setSignatureColor,
  onApply,
}) => {
  const [tab, setTab] = useState("signature");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6">Set your signature details</h2>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Full name:</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Initials:</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={initials}
              onChange={e => setInitials(e.target.value)}
            />
          </div>
        </div>
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${tab === "signature" ? "border-b-2 border-red-500 text-red-600" : "text-gray-500"}`}
            onClick={() => setTab("signature")}
          >
            <span className="mr-1">✒️</span> Signature
          </button>
          <button
            className={`px-4 py-2 font-medium ${tab === "initials" ? "border-b-2 border-red-500 text-red-600" : "text-gray-500"}`}
            onClick={() => setTab("initials")}
          >
            <span className="mr-1">AC</span> Initials
          </button>
          <button
            className={`px-4 py-2 font-medium ${tab === "stamp" ? "border-b-2 border-red-500 text-red-600" : "text-gray-500"}`}
            onClick={() => setTab("stamp")}
          >
            <span className="mr-1">👤</span> Company Stamp
          </button>
        </div>
        {tab === "signature" && (
          <div>
            <div className="mb-2">Choose your signature style:</div>
            <div className="space-y-2 mb-4">
              {signatureFonts.map((f, idx) => (
                <label key={idx} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="signature-style"
                    checked={signatureStyle === idx}
                    onChange={() => setSignatureStyle(idx)}
                    className="mr-2"
                  />
                  <span style={{ fontFamily: f.font, fontSize: 24, color: signatureColor }}>
                    {fullName}
                  </span>
                </label>
              ))}
            </div>
            <div className="mb-4">
              <span className="mr-2">Color:</span>
              {colors.map((c, idx) => (
                <button
                  key={c}
                  className={`w-6 h-6 rounded-full border-2 mr-2 ${signatureColor === c ? "border-red-500" : "border-gray-300"}`}
                  style={{ background: c }}
                  onClick={() => setSignatureColor(c)}
                />
              ))}
            </div>
          </div>
        )}
        {/* Add similar content for Initials and Company Stamp tabs if needed */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-6 py-2 rounded bg-red-500 text-white font-semibold" onClick={onApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default SignatureDetailsModal; 