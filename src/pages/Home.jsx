import React, { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import SignaturePanel from '../components/SignaturePanel';
import SignatureDetailsModal from '../components/SignatureDetailsModal';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';


// Use unpkg CDN for the workerSrc to avoid fetch errors in CRA
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // Signature details modal state
  const [showSignatureDetailsModal, setShowSignatureDetailsModal] = useState(false);
  const [fullName, setFullName] = useState('Mrunal Gaikwad');
  const [initials, setInitials] = useState('MG');
  const [signatureStyle, setSignatureStyle] = useState(0);
  const [signatureColor, setSignatureColor] = useState('#222');
  const [isPlacingSignature, setIsPlacingSignature] = useState(false);
  const [signaturePos, setSignaturePos] = useState(null); // {x, y} in px relative to PDF container
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const pdfContainerRef = React.useRef();
  const [signatureScale, setSignatureScale] = useState(1);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStart = React.useRef({ x: 0, scale: 1 });

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

  // Helper to get mouse position relative to PDF container
  const getRelativePos = useCallback((e) => {
    const rect = pdfContainerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Mouse event handlers for drag
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const pos = getRelativePos(e);
    setDragOffset({
      x: pos.x - (signaturePos?.x || 100),
      y: pos.y - (signaturePos?.y || 100),
    });
  };
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const pos = getRelativePos(e);
    setSignaturePos({
      x: pos.x - dragOffset.x,
      y: pos.y - dragOffset.y,
    });
  }, [isDragging, dragOffset.x, dragOffset.y, getRelativePos]);
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setIsPlacingSignature(false);
    }
  }, [isDragging]);

  // Resize handlers
  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStart.current = {
      x: e.clientX,
      scale: signatureScale,
    };
  };
  const handleResizeMouseMove = useCallback((e) => {
    if (!isResizing) return;
    const dx = e.clientX - resizeStart.current.x;
    let newScale = resizeStart.current.scale + dx / 150;
    newScale = Math.max(0.5, Math.min(3, newScale));
    setSignatureScale(newScale);
  }, [isResizing]);
  const handleResizeMouseUp = useCallback(() => {
    if (isResizing) setIsResizing(false);
  }, [isResizing]);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMouseMove);
      window.addEventListener('mouseup', handleResizeMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleResizeMouseMove);
        window.removeEventListener('mouseup', handleResizeMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp, handleResizeMouseMove, handleResizeMouseUp]);

  // Save PDF with text signature
  const handleSavePdf = async () => {
    console.log('Save PDF clicked', { selectedFile, signaturePos });
    if (!selectedFile || !signaturePos) return;
    // Load the PDF
    const arrayBuffer = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const page = pdfDoc.getPage(pageNumber - 1);
    // Embed a standard font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // Calculate position and size
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const renderWidth = 700;
    const scaleFactor = pageWidth / renderWidth;
    const x = (signaturePos.x || 100) * scaleFactor;
    const y = pageHeight - ((signaturePos.y || 100) + 48 * signatureScale) * scaleFactor;
    // Convert hex color to rgb
    const hexToRgb = hex => {
      const m = hex.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
      if (!m) return [0,0,0];
      return [parseInt(m[1],16)/255, parseInt(m[2],16)/255, parseInt(m[3],16)/255];
    };
    const [r, g, b] = hexToRgb(signatureColor);
    // Draw the signature as text
    page.drawText(fullName, {
      x,
      y,
      size: 36 * signatureScale,
      font,
      color: rgb(r, g, b),
    });
    // Save and download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signed.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  // UI before file selection
  if (!selectedFile) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-4">SnapSign</h1>
        <p className="text-xl text-gray-500 text-center mb-8 max-w-2xl">
          E-sign your documents quickly and securely with SnapSign. Upload, sign, and download your PDF in seconds.
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
      <div className="flex-1 flex flex-col items-center justify-start p-8 overflow-auto relative">
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
        <div ref={pdfContainerRef} className="border rounded shadow bg-white w-full max-w-2xl flex flex-col items-center relative" style={{ minHeight: 900 }}>
          <Document
            file={selectedFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="p-8">Loading PDF...</div>}
            className="w-full flex flex-col items-center"
          >
            <Page pageNumber={pageNumber} width={700} />
          </Document>
          {/* Drag-and-drop signature placement */}
          {(isPlacingSignature || signaturePos) && (
            <div
              style={{
                position: 'absolute',
                left: (signaturePos?.x || 100),
                top: (signaturePos?.y || 100),
                zIndex: 30,
                cursor: isPlacingSignature ? 'move' : 'pointer',
                userSelect: 'none',
                transform: `scale(${signatureScale})`,
                transformOrigin: 'top left',
              }}
              onMouseDown={isPlacingSignature ? handleMouseDown : (e) => { e.preventDefault(); setIsPlacingSignature(true); }}
            >
              <div
                className="px-6 py-2 rounded bg-white shadow-lg text-3xl font-signature border-2 border-red-300 flex items-center relative"
                style={{ color: signatureColor, fontFamily: 'Dancing Script, cursive' }}
              >
                {fullName}
                {isPlacingSignature && (
                  <button
                    className="ml-2 text-gray-400 hover:text-gray-600 text-lg"
                    onClick={e => { e.stopPropagation(); setIsPlacingSignature(false); setSignaturePos(null); }}
                  >✕</button>
                )}
                {/* Resize handle */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-white border border-gray-400 rounded cursor-se-resize flex items-center justify-center"
                  style={{ zIndex: 40 }}
                  onMouseDown={handleResizeMouseDown}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 10h8M4 8h6M6 6h4" stroke="#888" strokeWidth="1.5"/></svg>
                </div>
              </div>
            </div>
          )}
          {/* Overlay instructions */}
          {isPlacingSignature && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center z-10 pointer-events-none">
              <div className="mb-4 text-white text-xl font-semibold pointer-events-none">Drag your signature to the desired spot and release</div>
            </div>
          )}
        </div>
      </div>
      {/* Signing Options Panel */}
      <div className="w-full max-w-sm bg-white border-l shadow-lg flex flex-col p-8">
        <h2 className="text-2xl font-bold mb-6">Signing options</h2>
        {/* Use SignaturePanel and pass handler to open modal and sign */}
        <SignaturePanel
          onOpenSignatureDetails={() => setShowSignatureDetailsModal(true)}
          onSign={() => { setIsPlacingSignature(true); setSignaturePos(signaturePos || { x: 100, y: 100 }); }}
          onSavePdf={handleSavePdf}
          canSavePdf={!!signaturePos && !isPlacingSignature}
        />
      </div>
      {/* Signature Details Modal */}
      <SignatureDetailsModal
        open={showSignatureDetailsModal}
        onClose={() => setShowSignatureDetailsModal(false)}
        fullName={fullName}
        initials={initials}
        setFullName={setFullName}
        setInitials={setInitials}
        signatureStyle={signatureStyle}
        setSignatureStyle={setSignatureStyle}
        signatureColor={signatureColor}
        setSignatureColor={setSignatureColor}
        onApply={() => setShowSignatureDetailsModal(false)}
      />
    </div>
  );
};

export default Home;
