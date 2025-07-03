import React, { useState } from "react";
const signatureIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M2 17l7-7 4 4 7-7" stroke="#ef4444" strokeWidth="2" fill="none"/><circle cx="19" cy="5" r="2" fill="#ef4444"/></svg>
);
const digitalIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#a3a3a3" strokeWidth="2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#a3a3a3" strokeWidth="2" fill="none"/></svg>
);
const dragHandle = (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="4" cy="4" r="1.5" fill="#a3a3a3"/><circle cx="4" cy="8" r="1.5" fill="#a3a3a3"/><circle cx="4" cy="12" r="1.5" fill="#a3a3a3"/><circle cx="12" cy="4" r="1.5" fill="#a3a3a3"/><circle cx="12" cy="8" r="1.5" fill="#a3a3a3"/><circle cx="12" cy="12" r="1.5" fill="#a3a3a3"/></svg>
);

const SignaturePanel = ({ onOpenSignatureDetails, onSign, onSavePdf, canSavePdf }) => {
  const [type, setType] = useState("simple");
  const [signature, setSignature] = useState("Mrunal Gaikwad");
  const [editingSignature, setEditingSignature] = useState(false);
  const [initials, setInitials] = useState("MG");
  const [editingInitials, setEditingInitials] = useState(false);
  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [date, setDate] = useState("");
  const [editingDate, setEditingDate] = useState(false);

  return (
    <div className="w-full max-w-sm bg-white border-l shadow-lg flex flex-col p-6 overflow-y-auto">
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">Type</div>
        <div className="flex gap-2">
          <button
            className={`flex-1 flex flex-col items-center border-2 rounded-lg py-3 transition-all duration-150 ${
              type === "simple"
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-200 bg-gray-50 text-gray-400"
            }`}
            onClick={() => setType("simple")}
          >
            <span className="mb-1">{signatureIcon}</span>
            <span className="font-medium">Simple Signature</span>
          </button>
          <button
            className={`flex-1 flex flex-col items-center border-2 rounded-lg py-3 transition-all duration-150 ${
              type === "digital"
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-200 bg-gray-50 text-gray-400"
            } relative`}
            onClick={() => setType("digital")}
          >
            <span className="mb-1">{digitalIcon}</span>
            <span className="font-medium">Digital Signature</span>
            <span className="absolute top-2 right-2 text-yellow-500 text-lg">★</span>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="text-md font-semibold flex-1">Required fields</div>
          <button
            className="ml-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-500 transition"
            onClick={onOpenSignatureDetails}
            title="Set signature details"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
        </div>
        <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
          <span className="mr-2">{dragHandle}</span>
          <span className="mr-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Signature</span>
          {editingSignature ? (
            <input
              className="flex-1 border-b border-gray-300 outline-none text-lg font-signature bg-transparent"
              value={signature}
              onChange={e => setSignature(e.target.value)}
              onBlur={() => setEditingSignature(false)}
              onKeyDown={e => e.key === "Enter" && setEditingSignature(false)}
              autoFocus
            />
          ) : (
            <span
              className="flex-1 text-lg font-signature cursor-pointer"
              onClick={() => setEditingSignature(true)}
            >
              {signature}
            </span>
          )}
          <button className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => setEditingSignature(true)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 13.5V16h2.5l7.4-7.4-2.5-2.5L4 13.5zm11.7-6.3a1 1 0 0 0 0-1.4l-2.5-2.5a1 1 0 0 0-1.4 0l-1.1 1.1 3.9 3.9 1.1-1.1z" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-md font-semibold mb-2">Optional fields</div>
        <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
          <span className="mr-2">{dragHandle}</span>
          <span className="mr-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Signature</span>
        </div>
        <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
          <span className="mr-2">{dragHandle}</span>
          <span className="mr-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Initials</span>
          {editingInitials ? (
            <input
              className="flex-1 border-b border-gray-300 outline-none text-lg font-signature bg-transparent"
              value={initials}
              onChange={e => setInitials(e.target.value)}
              onBlur={() => setEditingInitials(false)}
              onKeyDown={e => e.key === "Enter" && setEditingInitials(false)}
              autoFocus
            />
          ) : (
            <span
              className="flex-1 text-lg font-signature cursor-pointer"
              onClick={() => setEditingInitials(true)}
            >
              {initials}
            </span>
          )}
          <button className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => setEditingInitials(true)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 13.5V16h2.5l7.4-7.4-2.5-2.5L4 13.5zm11.7-6.3a1 1 0 0 0 0-1.4l-2.5-2.5a1 1 0 0 0-1.4 0l-1.1 1.1 3.9 3.9 1.1-1.1z" fill="currentColor"/></svg>
          </button>
        </div>
        <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
          <span className="mr-2">{dragHandle}</span>
          <span className="mr-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Name</span>
          {editingName ? (
            <input
              className="flex-1 border-b border-gray-300 outline-none text-lg bg-transparent"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={e => e.key === "Enter" && setEditingName(false)}
              autoFocus
            />
          ) : (
            <span
              className="flex-1 text-lg cursor-pointer"
              onClick={() => setEditingName(true)}
            >
              {name}
            </span>
          )}
          <button className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => setEditingName(true)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 13.5V16h2.5l7.4-7.4-2.5-2.5L4 13.5zm11.7-6.3a1 1 0 0 0 0-1.4l-2.5-2.5a1 1 0 0 0-1.4 0l-1.1 1.1 3.9 3.9 1.1-1.1z" fill="currentColor"/></svg>
          </button>
        </div>
        <div className="flex items-center border rounded-lg p-3 mb-2 bg-gray-50">
          <span className="mr-2">{dragHandle}</span>
          <span className="mr-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Date</span>
          {editingDate ? (
            <input
              className="flex-1 border-b border-gray-300 outline-none text-lg bg-transparent"
              value={date}
              onChange={e => setDate(e.target.value)}
              onBlur={() => setEditingDate(false)}
              onKeyDown={e => e.key === "Enter" && setEditingDate(false)}
              autoFocus
            />
          ) : (
            <span
              className="flex-1 text-lg cursor-pointer"
              onClick={() => setEditingDate(true)}
            >
              {date}
            </span>
          )}
          <button className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => setEditingDate(true)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 13.5V16h2.5l7.4-7.4-2.5-2.5L4 13.5zm11.7-6.3a1 1 0 0 0 0-1.4l-2.5-2.5a1 1 0 0 0-1.4 0l-1.1 1.1 3.9 3.9 1.1-1.1z" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
      <button className="mt-6 bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 rounded-xl flex items-center justify-center transition-all duration-200"
        onClick={onSign}
      >
        Sign <span className="ml-2">➔</span>
      </button>
      <button
        className="mt-4 bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-2 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-50"
        onClick={onSavePdf}
        disabled={!canSavePdf}
      >
        Save PDF
      </button>
    </div>
  );
};

export default SignaturePanel; 