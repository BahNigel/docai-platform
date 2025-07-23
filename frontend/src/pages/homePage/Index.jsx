import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidbar/Sidebar';
import Header from '../../components/header/Header';
import { apiRequest } from '../../components/enteryPoint/entryPoint';
import {
  AiOutlineMessage,
  AiOutlineEye,
  AiOutlineNumber,
  AiOutlineLineChart,
  AiOutlineCluster,
  AiOutlineStar,
} from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchDocuments = async () => {
    const res = await apiRequest('/documents/', 'get');
    if (res.success) setDocuments(res.data);
  };

  const fetchCategories = async () => {
    const res = await apiRequest('/categories/', 'get');
    if (res.success) setCategories(res.data);
  };

  const addDocument = async () => {
    if (!newTitle.trim()) return alert('Title is required');
    if (!selectedCategory) return alert('Please select a category');

    const res = await apiRequest('/documents/', 'post', {
      title: newTitle,
      category: selectedCategory, // Must match backend expectations
      content: newContent,
    });

    if (res.success) {
      setNewTitle('');
      setNewContent('');
      setSelectedCategory('');
      fetchDocuments();
    } else {
      console.error(res.error);
      alert('Failed to add document');
    }
  };

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteDocument = async (id) => {
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
      fetchDocuments(); // refresh list
    } else {
      alert('Failed to delete the document. Please try again.');
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  const mlAreaIcons = {
    'bi-robot': <AiOutlineMessage className="fs-5 mb-1" />,
    'bi-eye': <AiOutlineEye className="fs-5 mb-1" />,
    'bi-table': <AiOutlineNumber className="fs-5 mb-1" />,
    'bi-diagram-3': <AiOutlineCluster className="fs-5 mb-1" />,
    'bi-clock-history': <AiOutlineLineChart className="fs-5 mb-1" />,
    'bi-stars': <AiOutlineStar className="fs-5 mb-1" />,
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-4 flex-grow-1 text-white"
        style={{ minHeight: '100vh', backgroundColor: '#0a0f1c' }}
      >
        <Header pageTitle="Home" initials="NB" />

        <div className="row">
          {/* Document List */}
          <div className="col-md-8 mb-4">
            <div
              className="p-4 rounded"
              style={{
                backgroundColor: '#1a2238',
                border: '1px solid #2e3b5c',
              }}
            >
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  backgroundColor: '#0f172a',
                  color: 'white',
                  borderColor: '#2e3b5c',
                }}
              />
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="pb-3 mb-3"
                  style={{ borderBottom: '1px solid #2e3b5c' }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-start gap-3">
                      <span
                        style={{
                          minWidth: '40px',
                          minHeight: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#0f172a',
                          borderRadius: '8px',
                        }}
                      >
                        <AiOutlineMessage className="fs-4" />
                      </span>
                      <div>
                        <strong className="text-white">{doc.title}</strong>
                        <div className="small mt-1">
                          {doc.content?.substring(0, 60) || 'No description'}
                        </div>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button
                        className="btn btn-link text-white p-0"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <BsThreeDotsVertical style={{ fontSize: '1.3rem' }} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() =>
                              navigate(`/documents/view/${doc.id}`)
                            }
                          >
                            View
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="dropdown-item text-danger"
                          >
                            🗑️ Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Document Form */}
          <div className="col-md-4">
            <div
              className="mb-4 p-4 rounded"
              style={{
                backgroundColor: '#1a2238',
                border: '1px solid #2e3b5c',
              }}
            >
              <h5 className="mb-3">Add Knowledge</h5>
              <input
                type="text"
                placeholder="Title"
                className="form-control mb-2"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <select
                className="form-select mb-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <textarea
                rows="3"
                placeholder="Write Content"
                className="form-control mb-3"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button className="btn btn-primary w-100" onClick={addDocument}>
                Save
              </button>
            </div>

            {/* Optional ML Tags */}
            <div
              className="p-4 rounded"
              style={{
                backgroundColor: '#1a2238',
                border: '1px solid #2e3b5c',
              }}
            >
              <h5 className="mb-3 text-center">Machine Learning Areas</h5>
              <div
                className="d-grid gap-2"
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  display: 'grid',
                }}
              >
                {[
                  { label: 'ML NLP', icon: 'bi-robot' },
                  { label: 'Computer Vision', icon: 'bi-eye' },
                  { label: 'Tabular ML', icon: 'bi-table' },
                  { label: 'Clustering', icon: 'bi-diagram-3' },
                  { label: 'Time Series', icon: 'bi-clock-history' },
                  { label: 'Generative AI', icon: 'bi-stars' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="btn btn-sm d-flex flex-column align-items-center justify-content-center"
                    style={{
                      backgroundColor: '#0f172a',
                      color: 'white',
                      border: '1px solid #2e3b5c',
                    }}
                  >
                    {mlAreaIcons[item.icon]}
                    {item.label}
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
