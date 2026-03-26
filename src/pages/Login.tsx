import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/choose-department');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className="field">
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="Staff ID"
              />
            </div>
            <div className="field password-field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button type="button" className="toggle-password">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="forgot">
                Forgot password
              </a>
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="login-right">
        <div className="branding">
          <p className="company-name">NAME OF COMPANY</p>
          <h1 className="workspace-title">WORKSPACE</h1>
        </div>
        <footer className="login-footer">
          <p>Powered by Orion Innovations</p>
        </footer>
      </div>
    </div>
  );
}
