import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log(isLogin ? 'Logging in...' : 'Registering...', formData);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', backgroundColor: '#0d1117', color: '#fff' }}
    >
      <div
        className="card p-4 shadow-lg border-0 rounded-4"
        style={{ backgroundColor: '#1a2238', width: '100%', maxWidth: '420px' }}
      >
        <h3 className="text-center fw-bold mb-4" style={{ color: '#fff' }}>
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h3>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label" style={{ color: '#fff' }}>
                Username
              </label>
              <input
                name="username"
                type="text"
                className="form-control text-white border-secondary"
                style={{ backgroundColor: '#1a2238' }}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label" style={{ color: '#fff' }}>
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control text-white border-secondary"
              style={{ backgroundColor: '#1a2238' }}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: '#fff' }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control text-white border-secondary"
              value={formData.password}
              style={{ backgroundColor: '#1a2238' }}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label" style={{ color: '#fff' }}>
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control text-white border-secondary"
                style={{ backgroundColor: '#1a2238' }}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 rounded-3">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <small style={{ color: '#fff' }}>
            {isLogin ? 'Don’t have an account!' : 'Already have an account!'}{' '}
            <button
              type="button"
              className="btn btn-link p-0 text-info"
              onClick={toggleAuthMode}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
