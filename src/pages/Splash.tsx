import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Splash.css';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="splash-logo" />
        <h1>Welcome to Dashboard</h1>
        <p>Loading…</p>
      </div>
    </div>
  );
}
