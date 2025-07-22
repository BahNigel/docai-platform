import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sidbar/Sidebar';
import {
  FiSend,
  FiUpload,
  FiMoreVertical,
  FiCopy,
  FiTrash2,
} from 'react-icons/fi';

const ChatRoomPage = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleAsk = () => {
    if (question.trim()) {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setMessages([...messages, { text: question, id: Date.now(), timestamp }]);
      console.log('User asked:', question);
      setQuestion('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const handleFileUpload = () => {
    console.log('File upload clicked');
    // Add file upload logic here
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
    setDropdownOpen(null);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    setDropdownOpen(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [question]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="d-flex min-vh-100 text-light"
      style={{ backgroundColor: '#0f172a' }}
    >
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3">
        <div
          ref={chatContainerRef}
          className="flex-grow-1 mb-3"
          style={{
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            padding: messages.length === 0 ? '1rem' : '1rem 0',
            backgroundColor: 'transparent',
            borderRadius: '0.75rem',
            width: '100%',
            scrollbarWidth: 'thin',
            scrollbarColor: '#4f46e5 #1e293b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: messages.length === 0 ? 'center' : 'flex-start',
            transition: 'background-color 0.3s ease',
          }}
        >
          <style>
            {`
                        ::-webkit-scrollbar {
                            width: 8px;
                        }
                        ::-webkit-scrollbar-track {
                            background: #1e293b;
                            border-radius: 4px;
                        }
                        ::-webkit-scrollbar-thumb {
                            background: #4f46e5;
                            border-radius: 4px;
                        }
                        ::-webkit-scrollbar-thumb:hover {
                            background: #6366f1;
                        }
                    `}
          </style>
          {messages.length === 0 ? (
            <div
              className="text-center"
              style={{ maxWidth: '600px', width: '100%' }}
            >
              <h1 className="mb-4" style={{ fontSize: '2.5rem' }}>
                Ask a question
              </h1>
              <p className="mb-3" style={{ color: 'white' }}>
                Curious about AI, ML, or neural networks? Ask any CS-level
                question here.
              </p>
              <div
                className="alert alert-info py-2"
                style={{ fontSize: '1rem' }}
              >
                Replies you get here will only be based on the documents you
                uploaded.
              </div>
            </div>
          ) : (
            <div
              style={{ padding: '0 1rem', maxWidth: '600px', width: '100%' }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="mb-2 position-relative"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    className="p-3 rounded"
                    style={{
                      backgroundColor: '#1e293b',
                      color: 'white',
                      maxWidth: '70%',
                      borderRadius: '1rem 1rem 0 1rem',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      position: 'relative',
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div style={{ textAlign: 'right' }}>
                        <div>{msg.text}</div>
                        <small
                          className="text-light"
                          style={{ fontSize: '0.8rem', opacity: 0.7 }}
                        >
                          {msg.timestamp}
                        </small>
                      </div>
                      <div className="position-relative">
                        <button
                          className="btn btn-sm btn-outline-light"
                          style={{
                            opacity: dropdownOpen === msg.id ? 1 : 0,
                            transition: 'opacity 0.2s',
                            borderRadius: '50%',
                            padding: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '0.5rem',
                          }}
                          onClick={() => toggleDropdown(msg.id)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = 1)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity =
                              dropdownOpen === msg.id ? 1 : 0)
                          }
                        >
                          <FiMoreVertical size={16} />
                        </button>
                        {dropdownOpen === msg.id && (
                          <div
                            className="dropdown-menu show"
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: '100%',
                              backgroundColor: '#1e293b',
                              border: '1px solid #475569',
                              minWidth: '100px',
                            }}
                          >
                            <button
                              className="dropdown-item text-light d-flex align-items-center"
                              onClick={() => handleCopy(msg.text)}
                              style={{
                                fontSize: '0.9rem',
                                padding: '0.5rem 1rem',
                              }}
                            >
                              <FiCopy className="me-2" /> Copy
                            </button>
                            <button
                              className="dropdown-item text-light d-flex align-items-center"
                              onClick={() => handleDelete(msg.id)}
                              style={{
                                fontSize: '0.9rem',
                                padding: '0.5rem 1rem',
                              }}
                            >
                              <FiTrash2 className="me-2" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="position-relative mb-3"
          style={{ maxWidth: '600px', width: '100%' }}
        >
          <textarea
            ref={textareaRef}
            className="form-control bg-dark text-light border-0 pe-5"
            placeholder="What is deep learning?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: '1rem 3.5rem 2.5rem 2.5rem',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              resize: 'none',
              minHeight: '48px',
              maxHeight: '160px',
              overflowY: 'hidden',
            }}
            rows={1}
          />

          {/* Upload Button (Left inside input) */}
          <button
            onClick={handleFileUpload}
            className="btn btn-outline-secondary"
            style={{
              position: 'absolute',
              left: '0.5rem',
              bottom: '0.5rem',
              borderRadius: '50%',
              width: '2.2rem',
              height: '2.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
            }}
            title="Upload file"
          >
            <FiUpload size={18} />
          </button>

          {/* Send Button (Right inside input) */}
          <button
            onClick={handleAsk}
            style={{
              position: 'absolute',
              right: '0.5rem',
              bottom: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              overflowY: 'hidden',
              border: 'none',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            title="Send"
          >
            <FiSend size={24} style={{ color: 'blanchedalmond' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
