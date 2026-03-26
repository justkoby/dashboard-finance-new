import { useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings, MdAccountBalanceWallet, MdEngineering } from 'react-icons/md';
import './ChooseDepartment.css';

export default function ChooseDepartment() {
  const navigate = useNavigate();

  const departments = [
    {
      id: 'administration',
      name: 'ADMINISTRATION',
      icon: <MdAdminPanelSettings size={48} />,
    },
    {
      id: 'finance',
      name: 'FINANCE',
      icon: <MdAccountBalanceWallet size={48} />,
    },
    {
      id: 'consultancy',
      name: 'CONSULTANCY',
      icon: <MdEngineering size={48} />,
    },
  ];

  return (
    <div className="choose-wrapper">
      <div className="choose-container">
        <header className="choose-header">
          <h1>WORKSPACE</h1>
          <h2>Choose your department</h2>
          <p>Select your department to continue</p>
        </header>

        <div className="department-grid">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="department-card"
              onClick={() => navigate('/dashboard')}
            >
              <div className="dept-icon">{dept.icon}</div>
              <span className="dept-name">{dept.name}</span>
            </div>
          ))}
        </div>

        <footer className="choose-footer">
          <p>Powered by Orion Innovations</p>
        </footer>
      </div>
    </div>
  );
}
