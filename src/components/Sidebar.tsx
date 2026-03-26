import {
  FaHome,
  FaCalendarAlt,
  FaChevronDown,
  FaBriefcase,
  FaBook,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaUniversity,
  FaCog,
  FaUserTie
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import MtnLogo from './MtnLogo';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/dashboard', badge: '8', badgeColor: '#b24b45' },
    { icon: FaBriefcase, label: 'Projects / Cases', path: '/projects' },
    { icon: FaMoneyBillWave, label: 'Overheads', path: '/overheads', hasSubmenu: true },
    { id: 'payroll', label: 'Payroll', icon: FaUserTie, path: '/payroll', badge: '2', badgeColor: '#ebb48d' },
    { icon: FaFileInvoiceDollar, label: 'Invoicing & Receivables', path: '/invoicing' },
    { icon: FaUniversity, label: 'Cashbook & Bank', path: '/cashbook', badge: '8', badgeColor: '#b8dcb9' },
    { icon: FaBook, label: 'Library (Past Financial Records)', path: '/library' },
    { icon: FaCalendarAlt, label: 'Calendar', path: '/calendar' },
    { icon: FaCog, label: 'Finance Settings & Configuration', path: '/settings' },
  ];

  return (
    <nav className="sidebar">
      <MtnLogo />
      
      <div className="sidebar-section">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path || (item.path === '/projects' && location.pathname.startsWith('/projects')) ? 'active' : ''}`}
            >
              <span className="sidebar-item-main">
                <item.icon className="icon" /> {item.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.badge && (
                  <span 
                    className="badge" 
                    style={{ 
                      backgroundColor: item.badgeColor,
                      color: item.badgeColor === '#ebb48d' ? '#4d433d' : (item.badgeColor === '#b8dcb9' ? '#355f38' : '#fff')
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.hasSubmenu && <FaChevronDown className="chevron" />}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
