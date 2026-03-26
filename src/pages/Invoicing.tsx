import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaPlus, FaSearch, FaFilter, FaDownload, FaEllipsisV, 
  FaClock, FaExclamationTriangle, FaPaperPlane
} from 'react-icons/fa';
import './Invoicing.css';

export default function Invoicing() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const agingBuckets = [
    { label: "0 – 30 Days", amount: "GHS 125,000", count: 8, color: "blue" },
    { label: "31 – 60 Days", amount: "GHS 48,500", count: 4, color: "orange" },
    { label: "61 – 90 Days", amount: "GHS 12,000", count: 2, color: "red" },
    { label: "90+ Days", amount: "GHS 5,400", count: 1, color: "darkred" },
  ];

  const invoices = [
    { id: 'INV-025', client: 'DERRER ENERGY', project: 'Kutunse Dev', date: '12 Mar 2025', due: '12 Apr 2025', amount: 'GHS 45,000', status: 'Sent' },
    { id: 'INV-024', client: 'MTN GHANA', project: 'Data Hub Fix', date: '05 Mar 2025', due: '05 Apr 2025', amount: 'GHS 120,000', status: 'Paid' },
    { id: 'INV-023', client: 'VODAFONE', project: 'Network Audit', date: '20 Feb 2025', due: '20 Mar 2025', amount: 'GHS 28,000', status: 'Overdue' },
    { id: 'INV-022', client: 'ASHANTI GOLD', project: 'Shaft 4 Cooling', date: '15 Feb 2025', due: '15 Mar 2025', amount: 'GHS 65,000', status: 'Partly Paid' },
  ];

  return (
    <div className="dashboard invoicing-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
             <div className="title-area">
                <h1>Invoicing & Receivables</h1>
                <p>Track global billings, manage client payments, and monitor debt aging.</p>
             </div>
             <div className="action-buttons">
                <button className="black-btn" onClick={() => setShowCreateModal(true)}>
                   <FaPlus /> Create New Invoice
                </button>
             </div>
          </div>

          <div className="receivables-header">
             <h3>Receivables Aging</h3>
             <div className="aging-grid">
                {agingBuckets.map((bucket, i) => (
                   <div key={i} className={`aging-card ${bucket.color}`}>
                      <div className="aging-info">
                         <span className="a-label">{bucket.label}</span>
                         <span className="a-val">{bucket.amount}</span>
                         <span className="a-sub">{bucket.count} Invoices</span>
                      </div>
                      <div className="aging-icon">
                         {bucket.color === 'blue' && <FaClock />}
                         {bucket.color === 'orange' && <FaExclamationTriangle />}
                         {(bucket.color === 'red' || bucket.color === 'darkred') && <FaExclamationTriangle />}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="invoice-list-section">
             <div className="list-controls">
                <div className="search-box">
                   <FaSearch className="s-icon" />
                   <input type="text" placeholder="Search invoice, client or project..." />
                </div>
                <div className="filter-group">
                   <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      <option>All Status</option>
                      <option>Paid</option>
                      <option>Sent</option>
                      <option>Overdue</option>
                      <option>Partly Paid</option>
                   </select>
                   <button className="icon-btn"><FaFilter  /></button>
                   <button className="icon-btn"><FaDownload /></button>
                </div>
             </div>

             <div className="table-card">
                <table className="refined-table">
                   <thead>
                      <tr>
                         <th>Invoice #</th>
                         <th>Client / Project</th>
                         <th>Date Issued</th>
                         <th>Due Date</th>
                         <th>Amount</th>
                         <th>Status</th>
                         <th>Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {invoices.map((inv) => (
                         <tr key={inv.id}>
                            <td className="bold">{inv.id}</td>
                            <td>
                               <div className="cp-cell">
                                  <span className="c-name">{inv.client}</span>
                                  <span className="p-name">{inv.project}</span>
                               </div>
                            </td>
                            <td>{inv.date}</td>
                            <td>{inv.due}</td>
                            <td className="amount-cell">{inv.amount}</td>
                            <td>
                               <span className={`status-badge ${inv.status.toLowerCase().replace(' ', '-')}`}>
                                  {inv.status}
                               </span>
                            </td>
                            <td>
                               <div className="table-links">
                                  <button className="link-btn">view</button>
                                  <button className="link-btn">edit</button>
                                  <button className="more-btn"><FaEllipsisV /></button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
         <div className="preview-overlay">
            <div className="invoice-modal">
               <div className="preview-header">
                  <h3>Create New Invoice</h3>
                  <button onClick={() => setShowCreateModal(false)} className="close-btn">×</button>
               </div>
               <div className="step-body invoice-form">
                  <div className="form-grid">
                     <div className="form-group wide">
                        <label>Select Project/Case</label>
                        <select className="refined-select">
                           <option>Presbyterian Kutunse Conference Center Development</option>
                           <option>MTN Data Hub Maintenance</option>
                           <option>Shaft 4 Cooling Project</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <label>Client</label>
                        <input type="text" className="refined-input" defaultValue="DERRER ENERGY GHANA LIMITED" disabled />
                     </div>
                     <div className="form-group">
                        <label>Contact Person</label>
                        <input type="text" className="refined-input" defaultValue="Kwadwo Antwi" />
                     </div>
                     <div className="form-group">
                        <label>Invoice Date</label>
                        <input type="date" className="refined-input" defaultValue="2025-03-15" />
                     </div>
                     <div className="form-group">
                        <label>Due Date</label>
                        <input type="date" className="refined-input" defaultValue="2025-04-15" />
                     </div>
                  </div>

                  <div className="line-items-section">
                     <h4>Line Items</h4>
                     <table className="line-items-table">
                        <thead>
                           <tr><th>Description</th><th>Qty</th><th>Rate (GHS)</th><th>Total</th><th></th></tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td><input type="text" placeholder="Item description" defaultValue="Final Design Implementation Mapping" /></td>
                              <td><input type="number" defaultValue="1" /></td>
                              <td><input type="number" defaultValue="45000" /></td>
                              <td className="bold">GHS 45,000</td>
                              <td><button className="remove-item">×</button></td>
                           </tr>
                        </tbody>
                     </table>
                     <button className="add-item-btn"><FaPlus /> Add Line Item</button>
                  </div>

                  <div className="invoice-totals">
                     <div className="total-row"><span>Subtotal</span><span>GHS 45,000</span></div>
                     <div className="total-row grand"><span>Total Due</span><span>GHS 45,000</span></div>
                  </div>

                  <div className="form-footer">
                     <button className="outline-btn wide" onClick={() => setShowCreateModal(false)}>Save as Draft</button>
                     <button className="black-btn wide" onClick={() => setShowCreateModal(false)}><FaPaperPlane /> Send Invoice</button>
                  </div>
               </div>
            </div>
         </div>
      )}
      <ChatWidget />
    </div>
  );
}
