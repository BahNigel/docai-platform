import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidbar/Sidebar';
import Header from '../../components/header/Header';
import { apiRequest } from '../../components/enteryPoint/entryPoint';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const ViewDocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [editableText, setEditableText] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await apiRequest(`/documents/${id}/`, 'get');
      if (response.success) {
        const doc = response.data;
        setDocumentName(doc.title);
        setTitleInput(doc.title);
        setEditableText(doc.content || '');
        setFileUrl(doc.file);
      } else {
        console.error('Failed to fetch document:', response.error);
      }
    };
    fetchDocument();
  }, [id]);

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

  const handleDeleteDocument = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this document? This action cannot be undone.',
      )
    ) {
      return;
    }

    const response = await apiRequest(`/documents/${id}/`, 'delete');
    if (response.success) {
      alert('Document deleted successfully.');
      navigate('/documents');
    } else {
      alert('Failed to delete the document. Please try again.');
    }
  };

  const renderPreview = () => {
    if (!fileUrl) return <p>No file available for preview.</p>;

    const extension = fileUrl.split('.').pop().toLowerCase();

    if (extension === 'pdf') {
      return (
        <div className="d-flex flex-column align-items-start">
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary mb-3"
          >
            📄 View "{documentName}" PDF in New Tab
          </a>
        </div>
      );
    }

    if (['mp4', 'webm'].includes(extension)) {
      return <video width="100%" height="300" controls src={fileUrl} />;
    }

    if (['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(extension)) {
      return (
        <div className="d-flex flex-column align-items-start">
          <audio
            controls
            src={fileUrl}
            style={{ width: '100%', marginBottom: 40 }}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }

    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return <img src={fileUrl} alt="Preview" style={{ maxWidth: '100%' }} />;
    }

    return (
      <div className="d-flex flex-column align-items-start">
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-primary mb-3"
        >
          📁 View "{documentName}" File in New Tab
        </a>
      </div>
    );
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: '100vh', backgroundColor: '#0d1117', color: '#fff' }}
    >
      <Sidebar />

      <div className="flex-grow-1 p-4">
        <Header pageTitle="View Document" initials="VD" />

        <div className="row">
          {/* File Preview Section */}
          <div className="col-md-5 mb-4">
            <div
              className="card text-white border-0 shadow rounded-4 p-3 h-100"
              style={{ backgroundColor: '#161b2d' }}
            >
              <h5 className="mb-3 fw-semibold">
                {documentName || 'No Document'}
              </h5>
              {renderPreview()}
              <button
                onClick={handleDeleteDocument}
                className="btn btn-danger rounded-pill fw-semibold px-4 mt-2"
              >
                🗑️ Delete Document
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
      </div>
    </div>
  );
};

export default ViewDocumentPage;
