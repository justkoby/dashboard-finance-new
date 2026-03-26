import { FaBell, FaChevronDown } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="search.." />
      </div>
      <div className="header-actions">
        <div className="org-selector">
          <span className="org-name">Finance</span>
          <FaChevronDown className="chevron-icon" />
        </div>
        <div className="avatar">KM</div>
        <div className="notification-wrap">
          <FaBell className="icon" />
          <span className="notification-dot" />
        </div>
      </div>
    </header>
  );
}
