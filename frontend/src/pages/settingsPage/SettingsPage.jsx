import React, { useState } from 'react';
import Sidebar from '../../components/sidbar/Sidebar';

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
  const [username, setUsername] = useState('example_user');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('********');
  const [language, setLanguage] = useState('English');

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Edit modes
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(false);

  // Temp fields
  const [tempUsername, setTempUsername] = useState(username);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPassword, setTempPassword] = useState('');
  const [tempLanguage, setTempLanguage] = useState(language);

  const saveUsername = () => {
    setUsername(tempUsername);
    setEditingUsername(false);
  };

  const saveEmail = () => {
    setEmail(tempEmail);
    setEditingEmail(false);
  };

  const savePassword = () => {
    if (tempPassword.length >= 6) {
      setPassword('********');
      setTempPassword('');
      setEditingPassword(false);
    } else {
      alert('Password must be at least 6 characters');
    }
  };

  const saveLanguage = () => {
    setLanguage(tempLanguage);
    setEditingLanguage(false);
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: '100vh', backgroundColor: '#0d1117' }}
    >
      <Sidebar />

      <div className="flex-grow-1 p-4 text-white">
        <h1 className="mb-4 fw-bold" style={{ fontSize: '2rem' }}>
          Settings
        </h1>

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

        {/* Notifications Section */}
        <div
          className="card text-white border-0 rounded-4 shadow-sm"
          style={{ backgroundColor: '#1a2238' }}
        >
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Notifications</h5>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="notificationsSwitch"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <label className="form-check-label" htmlFor="notificationsSwitch">
                Receive notifications
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
