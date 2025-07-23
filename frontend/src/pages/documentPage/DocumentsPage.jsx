import React, { useState, useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import Sidebar from '../../components/sidbar/Sidebar';
import Header from '../../components/header/Header';
import { apiRequest } from '../../components/enteryPoint/entryPoint';
import { useNavigate } from 'react-router-dom';

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [quickFilter, setQuickFilter] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [mode, setMode] = useState('file');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  const fetchDocuments = async () => {
    const res = await apiRequest('/documents/', 'get');
    if (res.success) setDocuments(res.data);
  };

  const fetchCategories = async () => {
    const res = await apiRequest('/categories/', 'get');
    if (res.success) setCategories(res.data);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return alert('Enter a category name');
    const res = await apiRequest('/categories/', 'post', { name: newCategory });
    if (res.success) {
      setCategories([...categories, res.data]);
      setNewCategory('');
    } else {
      alert('Failed to add category');
    }
  };

  const handleUpload = async () => {
    if (!title.trim()) return alert('Please enter a title.');
    if (!selectedCategory) return alert('Please select a category.');
    if (mode === 'file' && !file) return alert('Please select a file.');
    if (mode === 'text' && !textInput.trim())
      return alert('Please enter some text.');

    let payload;
    if (mode === 'file') {
      payload = new FormData();
      payload.append('title', title);
      payload.append('category', selectedCategory); // ID
      payload.append('file', file); // File object
    } else {
      payload = {
        title,
        category: selectedCategory,
        content: textInput,
      };
    }

    const res = await apiRequest('/documents/', 'post', payload);

    if (res.success) {
      alert('Document uploaded!');
      fetchDocuments();
      setTitle('');
      setFile(null);
      setTextInput('');
      setSelectedCategory('');
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
    } else {
      console.error(res.error);
      alert('Failed to upload document');
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(search);

    const categoryObj = categories.find(
      (cat) => cat.id === doc.category || cat.name === doc.category,
    );
    const categoryName = categoryObj?.name?.toLowerCase();

    const matchesQuickFilter =
      !quickFilter || categoryName === quickFilter.toLowerCase();

    return matchesSearch && matchesQuickFilter;
  });

  const handleQuickFilter = (value) => {
    setQuickFilter(value === quickFilter ? null : value);
  };

  return (
    <div
      className="d-flex"
      style={{ backgroundColor: '#0a0f1c', minHeight: '100vh' }}
    >
      <Sidebar />

      <div className="flex-grow-1 text-light p-4">
        <Header pageTitle="Documents" initials="NB" />

        <div className="row">
          <div className="col-lg-9">
            <input
              type="text"
              className="form-control mb-3 text-white border-secondary"
              placeholder="Search documents..."
              onChange={handleSearchChange}
              style={{ backgroundColor: '#1a2238' }}
            />

            <div className="row g-3">
              {filteredDocuments.length ? (
                filteredDocuments.map((doc, idx) => (
                  <div key={idx} className="col-md-3">
                    <div
                      className="rounded p-4 h-100"
                      style={{ backgroundColor: '#1a2238', cursor: 'pointer' }}
                      onClick={() => navigate(`/documents/view/${doc.id}`)}
                    >
                      <h5>{doc.title}</h5>
                      <p className="small mb-1">
                        {doc.content
                          ? doc.content.slice(0, 30) + '...'
                          : 'File uploaded'}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {doc.date || 'No Date'}
                        </small>
                        <BiChevronRight />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No documents found.</p>
              )}
            </div>

            {/* Upload Section */}
            <div
              className="p-4 rounded mt-4"
              style={{ backgroundColor: '#1a2238' }}
            >
              <h5 className="mb-3">Add New Document</h5>

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

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control text-white border-secondary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ backgroundColor: '#1a2238' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select
                  className="form-control text-white border-secondary"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ backgroundColor: '#1a2238' }}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {mode === 'file' && (
                <div className="mb-3">
                  <label className="form-label">Choose File</label>
                  <input
                    type="file"
                    id="fileInput"
                    className="form-control text-white border-secondary"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ backgroundColor: '#1a2238' }}
                  />
                </div>
              )}

              {mode === 'text' && (
                <div className="mb-3">
                  <label className="form-label">Write Content</label>
                  <textarea
                    className="form-control text-white border-secondary"
                    rows="5"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    style={{ backgroundColor: '#1a2238' }}
                  />
                </div>
              )}

              <button
                className="btn btn-outline-success"
                onClick={handleUpload}
              >
                {mode === 'file' ? 'Upload File' : 'Save Text'}
              </button>
            </div>

            {/* Add Category */}
            <div
              className="p-4 rounded mt-4"
              style={{ backgroundColor: '#1a2238' }}
            >
              <h5 className="mb-3">Add New Category</h5>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control text-white border-secondary"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ backgroundColor: '#1a2238' }}
                />
                <button
                  className="btn btn-outline-info"
                  onClick={handleAddCategory}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="col-lg-3 mt-4 mt-lg-0">
            <div
              className="p-3 rounded mb-4 text-center"
              style={{ backgroundColor: '#1a2238' }}
            >
              <h3>{filteredDocuments.length}</h3>
              <p className="text-muted mb-0">Documents</p>
            </div>

            <div
              className="p-3 rounded mb-4"
              style={{ backgroundColor: '#1a2238' }}
            >
              <h6 className="text-white">Quick Filters</h6>
              <div className="d-grid gap-2 mt-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`btn btn-outline-light d-flex justify-content-between ${
                      quickFilter === cat.name ? 'active' : ''
                    }`}
                    onClick={() => handleQuickFilter(cat.name)}
                  >
                    {cat.name} <BiChevronRight />
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
