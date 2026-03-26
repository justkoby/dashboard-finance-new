import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaUndo, FaSave, FaBuilding, FaPercentage, FaTags, FaUserShield, FaGlobe
} from 'react-icons/fa';
import './Settings.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="dashboard settings-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
             <div className="title-area">
                <h1>Finance Settings</h1>
                <p>Configure statutory rates, transaction categories, and firm financial rules.</p>
             </div>
             <div className="action-buttons">
                <button className="outline-btn"><FaUndo /> Reset to Default</button>
                <button className="black-btn"><FaSave /> Save Changes</button>
             </div>
          </div>

          <div className="settings-tabs">
             <button className={`tab-btn ${activeTab === 'General' ? 'active' : ''}`} onClick={() => setActiveTab('General')}>General</button>
             <button className={`tab-btn ${activeTab === 'Statutory' ? 'active' : ''}`} onClick={() => setActiveTab('Statutory')}>Statutory & Tax</button>
             <button className={`tab-btn ${activeTab === 'Categories' ? 'active' : ''}`} onClick={() => setActiveTab('Categories')}>Categories</button>
             <button className={`tab-btn ${activeTab === 'Roles' ? 'active' : ''}`} onClick={() => setActiveTab('Roles')}>Roles & Permissions</button>
          </div>

          <div className="tab-content">
             {activeTab === 'General' && (
               <div className="settings-section">
                  <div className="s-card">
                     <div className="s-header"><FaGlobe /> Localization</div>
                     <div className="form-grid">
                        <div className="form-group">
                           <label>Base Currency</label>
                           <select className="refined-select"><option>GHS - Ghanaian Cedi</option></select>
                        </div>
                        <div className="form-group">
                           <label>Financial Year Start</label>
                           <select className="refined-select"><option>January</option></select>
                        </div>
                     </div>
                  </div>
                  <div className="s-card">
                     <div className="s-header"><FaBuilding /> Firm Details</div>
                     <div className="form-grid">
                        <div className="form-group">
                           <input type="text" className="refined-input" placeholder="Firm Legal Name" defaultValue="MTN WORKSPACE SERVICES" />
                        </div>
                        <div className="form-group">
                           <input type="text" className="refined-input" placeholder="Tax PIN" defaultValue="P001234567T" />
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'Statutory' && (
               <div className="settings-section">
                  <div className="s-card">
                     <div className="s-header"><FaPercentage /> Statutory Rates</div>
                     <div className="form-grid">
                        <div className="form-group">
                           <label>SSNIT Employer (%)</label>
                           <input type="number" className="refined-input" defaultValue="13.5" />
                        </div>
                        <div className="form-group">
                           <label>SSNIT Employee (%)</label>
                           <input type="number" className="refined-input" defaultValue="5.5" />
                        </div>
                        <div className="form-group">
                           <label>Apply PAYE Tax Brackets</label>
                           <span className="toggle-switch">Managed by System</span>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'Categories' && (
               <div className="settings-section">
                  <div className="s-card">
                     <div className="s-header"><FaTags /> Transaction Categories</div>
                     <div className="cat-list">
                        <div className="cat-item">Project Income <button className="remove-btn">×</button></div>
                        <div className="cat-item">Office Rent <button className="remove-btn">×</button></div>
                        <div className="cat-item">Staff Welfare <button className="remove-btn">×</button></div>
                        <button className="add-cat-btn">+ Add Category</button>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'Roles' && (
               <div className="settings-section">
                  <div className="s-card">
                     <div className="s-header"><FaUserShield /> Finance Access Controls</div>
                     <div className="role-list">
                        <div className="role-item">
                           <span className="role-name">Finance Manager</span>
                           <span className="role-desc">Full access to and editing of all financial modules.</span>
                        </div>
                        <div className="role-item">
                           <span className="role-name">Accountant</span>
                           <span className="role-desc">Record transactions and generate reports. No settings access.</span>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}
