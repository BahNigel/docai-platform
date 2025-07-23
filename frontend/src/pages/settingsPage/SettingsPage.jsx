import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidbar/Sidebar';
import Header from '../../components/header/Header';
import { apiRequest } from '../../components/enteryPoint/entryPoint';

const languages = [
  'English',
  'French',
  'Spanish',
  'German',
  'Arabic',
  'Chinese',
  'Japanese',
  'Portuguese',
  'Russian',
  'Korean',
  'Hindi',
  'Italian',
  'Swahili',
  'Dutch',
  'Turkish',
  'Urdu',
  'Vietnamese',
  'Thai',
  'Greek',
  'Hebrew',
  'Bengali',
  'Polish',
  'Romanian',
  'Norwegian',
  'Finnish',
  'Czech',
  'Hungarian',
  'Malay',
  'Indonesian',
  'Zulu',
  'Afrikaans',
  'Filipino',
  'Amharic',
  'Tamil',
  'Telugu',
  'Ukrainian',
  'Persian',
  'Serbian',
  'Croatian',
  'Slovak',
  'Estonian',
  'Latvian',
  'Lithuanian',
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('********');
  const [language, setLanguage] = useState('English');

  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(false);

  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [tempLanguage, setTempLanguage] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    console.log('token check', `Bearer ${token}`);

    apiRequest('/user/', 'get', null, {
      Authorization: `Bearer ${token}`,
    }).then((res) => {
      if (res.success) {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setLanguage(res.data.language || 'English');
      } else {
        alert('Failed to load user data');
      }
    });
  }, [token, navigate]);

  const saveUsername = () => {
    apiRequest(
      '/user/',
      'patch',
      { username: tempUsername },
      {
        Authorization: `Bearer ${token}`,
      },
    ).then((res) => {
      if (res.success) {
        setUsername(res.data.username);
        setEditingUsername(false);
      } else {
        const err = res.error?.username || res.error;
        alert(
          typeof err === 'string' ? err : err[0] || 'Failed to update username',
        );
      }
    });
  };

  const saveEmail = () => {
    apiRequest(
      '/user/',
      'patch',
      { email: tempEmail },
      {
        Authorization: `Bearer ${token}`,
      },
    ).then((res) => {
      if (res.success) {
        setEmail(res.data.email);
        setEditingEmail(false);
      } else {
        const err = res.error?.email || res.error;
        alert(
          typeof err === 'string' ? err : err[0] || 'Failed to update email',
        );
      }
    });
  };

  const savePassword = () => {
    if (tempPassword.length >= 6) {
      apiRequest(
        '/change-password/',
        'post',
        { password: tempPassword },
        {
          Authorization: `Bearer ${token}`,
        },
      ).then((res) => {
        if (res.success) {
          setPassword('********');
          setTempPassword('');
          setEditingPassword(false);
          alert('Password updated successfully');
        } else {
          alert(res.error?.error || 'Failed to update password');
        }
      });
    } else {
      alert('Password must be at least 6 characters');
    }
  };

  const saveLanguage = () => {
    apiRequest(
      '/user/',
      'patch',
      { language: tempLanguage },
      {
        Authorization: `Bearer ${token}`,
      },
    ).then((res) => {
      if (res.success) {
        setLanguage(res.data.language);
        setEditingLanguage(false);
      } else {
        alert('Failed to update language');
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: '100vh', backgroundColor: '#0d1117' }}
    >
      <Sidebar />

      <div className="flex-grow-1 p-4 text-white d-flex flex-column">
        <Header pageTitle="Settings" />

        {/* Account Section */}
        <div
          className="card text-white mb-4 border-0 rounded-4 shadow-sm"
          style={{ backgroundColor: '#1a2238' }}
        >
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Account</h5>

            {/* Username */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Username</div>
                {!editingUsername ? (
                  <div>{username}</div>
                ) : (
                  <input
                    type="text"
                    className="form-control bg-black text-white border-secondary mt-1"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                  />
                )}
              </div>
              {!editingUsername ? (
                <button
                  className="btn btn-secondary px-3 py-1"
                  onClick={() => {
                    setTempUsername(username);
                    setEditingUsername(true);
                  }}
                >
                  Change
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={saveUsername}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setEditingUsername(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Email</div>
                {!editingEmail ? (
                  <div>{email}</div>
                ) : (
                  <input
                    type="email"
                    className="form-control bg-black text-white border-secondary mt-1"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                  />
                )}
              </div>
              {!editingEmail ? (
                <button
                  className="btn btn-secondary px-3 py-1"
                  onClick={() => {
                    setTempEmail(email);
                    setEditingEmail(true);
                  }}
                >
                  Change
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={saveEmail}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setEditingEmail(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Password</div>
                {!editingPassword ? (
                  <div>{password}</div>
                ) : (
                  <input
                    type="password"
                    className="form-control bg-black text-white border-secondary mt-1"
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                  />
                )}
              </div>
              {!editingPassword ? (
                <button
                  className="btn btn-secondary px-3 py-1"
                  onClick={() => {
                    setTempPassword('');
                    setEditingPassword(true);
                  }}
                >
                  Change
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={savePassword}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setEditingPassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div
          className="card text-white mb-4 border-0 rounded-4 shadow-sm"
          style={{ backgroundColor: '#1a2238' }}
        >
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Language</h5>
            <div className="d-flex justify-content-between align-items-center">
              <div className="w-75">
                <div className="text-muted small">Preferred Language</div>
                {!editingLanguage ? (
                  <div>{language}</div>
                ) : (
                  <select
                    className="form-select bg-black text-white border-secondary mt-1"
                    value={tempLanguage}
                    onChange={(e) => setTempLanguage(e.target.value)}
                  >
                    {languages.map((lang, index) => (
                      <option key={index} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {!editingLanguage ? (
                <button
                  className="btn btn-secondary px-3 py-1"
                  onClick={() => {
                    setTempLanguage(language);
                    setEditingLanguage(true);
                  }}
                >
                  Change
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={saveLanguage}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setEditingLanguage(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto pt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
