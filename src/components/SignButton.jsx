import React from "react";

const SignButton = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
  >
    Sign PDF
  </button>
);

export default SignButton; 