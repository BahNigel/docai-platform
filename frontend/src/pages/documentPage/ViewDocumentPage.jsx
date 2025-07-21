import React, { useRef, useState, useEffect } from 'react';
import Sidebar from '../../components/sidbar/Sidebar';

const ViewDocumentPage = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [documentName, setDocumentName] = useState('document.pdf');
  const [editableText, setEditableText] = useState(
    'Editable text with ability to draw...',
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const [titleInput, setTitleInput] = useState(documentName);

  // Canvas Drawing Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const startDraw = (e) => {
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      setIsDrawing(true);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const stopDraw = () => setIsDrawing(false);

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDraw);
      canvas.removeEventListener('mouseleave', stopDraw);
    };
  }, [isDrawing]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setDocumentName('');
      setTitleInput('');
      setUploadedFile(null);
      setEditableText('');
      clearCanvas();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const submitCanvasDrawing = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');
    console.log('Drawing submitted:', imageData);
    alert('Drawing submitted successfully!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setDocumentName(file.name);
      setTitleInput(file.name);
    }
  };

  const handleTitleUpdate = () => {
    setDocumentName(titleInput || 'Untitled Document');
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: '100vh', backgroundColor: '#0d1117', color: '#fff' }}
    >
      <Sidebar />

      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold mb-4">View Document</h2>

        {/* Upload Section */}
        <div
          className="card border-0 shadow rounded-4 p-4 mb-4"
          style={{ backgroundColor: '#161b2d' }}
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Upload Document</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileUpload}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Document Title</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="Enter document title"
                />
                <button className="btn btn-primary" onClick={handleTitleUpdate}>
                  Save Title
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Document Preview */}
          <div className="col-md-5 mb-4">
            <div
              className="card text-white border-0 shadow rounded-4 p-3 h-100"
              style={{ backgroundColor: '#161b2d' }}
            >
              <h5 className="mb-3 fw-semibold">
                {documentName || 'No Document'}
              </h5>
              <div
                className="bg-white text-dark rounded p-3"
                style={{ height: '400px', overflowY: 'auto' }}
              >
                <p>
                  <strong>{titleInput || 'Sample Document'}</strong>
                </p>
                <p>Lorem ipsum dolor sit amet consectetur...</p>
              </div>
              <button
                onClick={handleDelete}
                className="btn btn-danger mt-4 rounded-3"
              >
                Delete File
              </button>
            </div>
          </div>

          {/* Editable Text + Canvas */}
          <div className="col-md-7 mb-4">
            <div
              className="card text-white border-0 shadow rounded-4 p-3 h-100"
              style={{ backgroundColor: '#161b2d' }}
            >
              <h5 className="mb-3 fw-semibold">Editable Content</h5>
              <textarea
                className="form-control text-white border-secondary mb-3"
                style={{ backgroundColor: '#161b2d' }}
                rows={6}
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                placeholder="Editable text goes here..."
              />
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                style={{
                  backgroundColor: '#1c1f26',
                  borderRadius: '10px',
                  cursor: 'crosshair',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              />
              <div className="d-flex gap-2 justify-content-end">
                <button
                  className="btn btn-outline-warning rounded-pill px-3"
                  onClick={clearCanvas}
                >
                  Clear Drawing
                </button>
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={submitCanvasDrawing}
                >
                  Submit Drawing
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Delete (Optional) */}
        <div className="text-end mt-4">
          <button
            className="btn btn-outline-danger px-4 rounded-pill"
            onClick={handleDelete}
          >
            Delete File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentPage;
