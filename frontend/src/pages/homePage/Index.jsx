import React from 'react';
import Sidebar from '../../components/sidbar/Sidebar';

// Import needed icons from react-icons
import {
  AiOutlineMessage, // ML NLP
  AiOutlineEye, // Computer Vision
  AiOutlineNumber, // Tabular ML (Tabular ML)
  AiOutlineLineChart, // Time Series
  AiOutlineCluster, // Clustering
} from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai'; // For Generative AI (closest match)
import { BsBell, BsSearch, BsThreeDotsVertical } from 'react-icons/bs';

export default function HomePage() {
  // Document icons (keep using Bs icons for these, or replace if you want)
  const docIcons = {
    'bi-file-earmark-bar-graph': <AiOutlineLineChart className="fs-4" />,
    'bi-lightbulb': <AiOutlineMessage className="fs-4" />,
    'bi-journal-text': <AiOutlineMessage className="fs-4" />,
    'bi-mortarboard': <AiOutlineMessage className="fs-4" />,
  };

  // ML Area icons using AiOutline* icons
  const mlAreaIcons = {
    'bi-robot': <AiOutlineMessage className="fs-5 mb-1" />, // ML NLP
    'bi-eye': <AiOutlineEye className="fs-5 mb-1" />, // Computer Vision
    'bi-table': <AiOutlineNumber className="fs-5 mb-1" />, // Tabular ML
    'bi-diagram-3': <AiOutlineCluster className="fs-5 mb-1" />, // Clustering
    'bi-clock-history': <AiOutlineLineChart className="fs-5 mb-1" />, // Time Series
    'bi-stars': <AiOutlineStar className="fs-5 mb-1" />, // Generative AI (closest)
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-4 flex-grow-1 text-white"
        style={{ minHeight: '100vh', backgroundColor: '#0a0f1c' }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>AI-Powered Intelligent Knowledge Management Platform</h2>
          <div className="d-flex gap-3 align-items-center">
            <BsBell className="text-white fs-5" />
            <BsSearch className="text-white fs-5" />
            <div
              className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: '32px', height: '32px' }}
            >
              JD
            </div>
          </div>
        </div>

        {/* Repository Section */}
        <div className="row">
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
                style={{
                  backgroundColor: '#0f172a',
                  color: 'white',
                  borderColor: '#2e3b5c',
                }}
              />
              {[
                {
                  name: 'Annual Report',
                  icon: 'document',
                  description: 'Summary of yearly performance and financials.',
                },
                {
                  name: 'Project Proposal',
                  icon: 'document',
                  description: 'Outline of new project objectives and plans.',
                },
                {
                  name: 'Meeting Notes',
                  icon: 'document',
                  description: 'Key points and action items from meetings.',
                },
                {
                  name: 'Training Materials',
                  icon: 'document',
                  description: 'Resources and guides for employee training.',
                },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="pb-3 mb-3"
                  style={{
                    borderBottom: '1px solid #2e3b5c',
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-start gap-3">
                      <span
                        style={{
                          minWidth: '40px',
                          minHeight: '40px',
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#0f172a',
                          borderRadius: '8px',
                        }}
                      >
                        {docIcons[doc.icon]}
                      </span>
                      <div>
                        <strong className="text-white">{doc.name}</strong>
                        <div className="small mt-1">{doc.description}</div>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button
                        className="btn btn-link text-white p-0"
                        type="button"
                        id={`dropdownMenuButton${idx}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ fontSize: '1.5rem', lineHeight: 1 }}
                      >
                        {/* Use react-icons for 3 dots */}
                        <BsThreeDotsVertical style={{ fontSize: '1.3rem' }} />
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby={`dropdownMenuButton${idx}`}
                      >
                        <li>
                          <button className="dropdown-item">View</button>
                        </li>
                        <li>
                          <button className="dropdown-item text-danger">
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="p-4 rounded d-flex gap-3 mt-4 justify-content-center"
              style={{
                backgroundColor: '#1a2238',
                border: '1px solid #2e3b5c',
              }}
            >
              <button
                className="btn w-50 d-flex flex-column align-items-center justify-content-center"
                style={{
                  backgroundColor: '#0f172a',
                  color: 'white',
                  border: '1px solid #2e3b5c',
                }}
              >
                <AiOutlineMessage className="fs-4 mb-1 d-flex align-items-center justify-content-center" />
                <span className="text-center w-100">ML NLP</span>
              </button>
              <button
                className="btn w-50 d-flex flex-column align-items-center justify-content-center"
                style={{
                  backgroundColor: '#0f172a',
                  color: 'white',
                  border: '1px solid #2e3b5c',
                }}
              >
                <AiOutlineEye className="fs-4 mb-1 d-flex align-items-center justify-content-center" />
                <span className="text-center w-100">Computer Vision</span>
              </button>
            </div>
          </div>
          <div className="col-md-4">
            {/* Add Knowledge */}
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
              />
              <textarea
                rows="3"
                placeholder="Write Content"
                className="form-control mb-3"
              ></textarea>
              <button className="btn btn-primary w-100">Save</button>
            </div>

            {/* ML Areas */}
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
