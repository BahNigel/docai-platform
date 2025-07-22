import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '', // Add confirm_password to state
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password, // Add confirm_password
        };

    try {
      if (isLogin) {
        const res = await axios.post(
          'http://localhost:8000/api/token/',
          payload,
        );
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('username', formData.username);
        alert('Logged in successfully!');
        navigate('/home');
      } else {
        await axios.post('http://localhost:8000/api/register/', payload);
        alert('Registered successfully. Now you can log in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert(
        'Authentication failed: ' +
          JSON.stringify(err.response?.data || err.message),
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#0f172a',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#1e293b',
          color: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
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

        {/* Email (only if Registering) */}
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Email</label>
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
        )}

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control text-white border-secondary"
            style={{ backgroundColor: '#1a2238' }}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password (only if Registering) */}
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              name="confirm_password"
              type="password"
              className="form-control text-white border-secondary"
              style={{ backgroundColor: '#1a2238' }}
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? 'Login' : 'Register'}
        </button>

        {/* Toggle */}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#0ea5e9',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthPage;
