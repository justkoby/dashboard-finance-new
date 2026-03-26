import { useState } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const departments = [
    { name: 'Finance', active: true },
    { name: 'Administration', active: false },
    { name: 'Consultancy', active: false },
  ];

  return (
    <header className="header">
      <div className="header-search">
        <input type="text" placeholder="search.." />
      </div>
      <div className="header-actions">
        <div className="dropdown-container">
          <div 
            className="org-selector"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="org-name">Finance</span>
            <FaChevronDown className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
          </div>
          
          {isDropdownOpen && (
            <div className="org-dropdown-menu">
              {departments.map((dept, i) => (
                <div 
                  key={i} 
                  className={`dropdown-item ${!dept.active ? 'disabled' : ''}`}
                  onClick={(e) => {
                    if (!dept.active) e.stopPropagation();
                    else setIsDropdownOpen(false);
                  }}
                >
                  {dept.name}
                  {!dept.active && <span className="inactive-tag">Inactive</span>}
                </div>
              ))}
            </div>
          )}
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
