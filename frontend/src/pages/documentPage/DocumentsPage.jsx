import React, { useState } from 'react';
import { BiBell, BiSearch, BiChevronRight, BiFilterAlt } from 'react-icons/bi';
import Sidebar from '../../components/sidbar/Sidebar';
import Header from '../../components/header/Header';

const documentsData = [
  {
    title: 'Annual Report',
    date: 'Mar 20, 2024',
    category: 'Finance',
    tag: 'Annual',
  },
  {
    title: 'Project Proposal',
    date: 'Mar 20, 2024',
    category: 'Development',
    tag: 'Proposal',
  },
  {
    title: 'Financial Plan',
    date: 'Mar 20, 2024',
    category: 'Finance',
    tag: 'Plan',
  },
  {
    title: 'Meeting Notes',
    date: 'Mar 20, 2024',
    category: 'Meetings',
    tag: 'Notes',
  },
  {
    title: 'Annual Report',
    date: 'Mar 20, 2024',
    category: 'Finance',
    tag: 'Annual',
  },
  {
    title: 'Project Proposal',
    date: 'Mar 20, 2024',
    category: 'Development',
    tag: 'Proposal',
  },
  {
    title: 'Financial Plan',
    date: 'Mar 20, 2024',
    category: 'Finance',
    tag: 'Plan',
  },
  {
    title: 'Meeting Notes',
    date: 'Mar 20, 2024',
    category: 'Meetings',
    tag: 'Notes',
  },
];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [quickFilter, setQuickFilter] = useState(null);

  // Upload/Create states
  const [mode, setMode] = useState('file'); // "file" or "text"
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(search);
    const matchesQuickFilter =
      !quickFilter || doc.category === quickFilter || doc.tag === quickFilter;

    return matchesSearch && matchesQuickFilter;
  });

  const handleQuickFilter = (value) => {
    setQuickFilter(value === quickFilter ? null : value);
  };

  const handleDocumentClick = (title) => {
    alert(`Open "${title}" document`);
  };

  const handleUpload = () => {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }

    if (mode === 'file' && !file) {
      alert('Please select a file.');
      return;
    }

    if (mode === 'text' && !textInput.trim()) {
      alert('Please enter some text.');
      return;
    }

    const uploadMessage =
      mode === 'file'
        ? `Uploaded File:\nTitle: ${title}\nFile: ${file.name}`
        : `Saved Text:\nTitle: ${title}\nContent: ${textInput.slice(0, 30)}...`;

    alert(uploadMessage);

    // Reset form
    setTitle('');
    setFile(null);
    setTextInput('');
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div
      className="d-flex"
      style={{ backgroundColor: '#0a0f1c', minHeight: '100vh' }}
    >
      <Sidebar />

      <div className="flex-grow-1 text-light p-4">
        {/* Header */}
        <Header pageTitle="Documents" initials="NB" />

        {/* Main Section */}
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-9">
            <div className="row g-3">
              {filteredDocuments.length ? (
                filteredDocuments.map((doc, idx) => (
                  <div key={idx} className="col-md-3">
                    <div
                      className="rounded p-4 h-100"
                      style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
                      onClick={() => handleDocumentClick(doc.title)}
                    >
                      <h5>{doc.title}</h5>
                      <p className="small mb-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{doc.date}</small>
                        <BiChevronRight
                          role="button"
                          onClick={() => handleDocumentClick(doc.title)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No documents found.</p>
              )}
            </div>

            {/* Upload/Create Section */}
            <div
              className="p-4 rounded mt-4"
              style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
            >
              <h5 className="mb-3">Add New Document</h5>

              {/* Toggle Buttons */}
              <div className="btn-group mb-3">
                <button
                  className={`btn btn-outline-light ${mode === 'file' ? 'active' : ''}`}
                  onClick={() => setMode('file')}
                >
                  Upload File
                </button>
                <button
                  className={`btn btn-outline-light ${mode === 'text' ? 'active' : ''}`}
                  onClick={() => setMode('text')}
                >
                  Write Text
                </button>
              </div>

              {/* Title Field */}
              <div className="mb-3">
                <label htmlFor="docTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="docTitle"
                  className="form-control text-white border-secondary"
                  placeholder="Enter document title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
                />
              </div>

              {/* File Upload */}
              {mode === 'file' && (
                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="form-control text-white border-secondary"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
                  />
                </div>
              )}

              {/* Text Area */}
              {mode === 'text' && (
                <div className="mb-3">
                  <label htmlFor="textInput" className="form-label">
                    Write Content
                  </label>
                  <textarea
                    id="textInput"
                    className="form-control text-white border-secondary"
                    rows="6"
                    placeholder="Write your document here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
                  ></textarea>
                </div>
              )}

              <button
                className="btn btn-outline-success"
                onClick={handleUpload}
              >
                {mode === 'file' ? 'Upload File' : 'Save Text'}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-3 mt-4 mt-lg-0">
            <div
              className="p-3 rounded mb-4 text-center"
              style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
            >
              <h3>{filteredDocuments.length}</h3>
              <p className="text-muted mb-0">Documents</p>
            </div>

            <div
              className="p-3 rounded mb-4"
              style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
            >
              <h6 className="text-white">Quick Filters</h6>
              <div className="d-grid gap-2 mt-3">
                {['Finance', 'Development', 'Meetings'].map((val) => (
                  <button
                    key={val}
                    className={`btn btn-outline-light d-flex justify-content-between ${
                      quickFilter === val ? 'active' : ''
                    }`}
                    onClick={() => handleQuickFilter(val)}
                  >
                    {val} <BiChevronRight />
                  </button>
                ))}
              </div>
            </div>

            <div
              className="p-3 rounded"
              style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
            >
              <div className="d-flex flex-column gap-2 mt-2">
                {['Annual', 'Plan'].map((tag) => (
                  <button
                    key={tag}
                    className="btn btn-outline-light d-flex align-items-center gap-2"
                    onClick={() => handleQuickFilter(tag)}
                  >
                    <BiFilterAlt /> {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
