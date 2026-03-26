import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaPlus, FaCloudUploadAlt, FaArrowUp, FaArrowDown, FaCalendarAlt
} from 'react-icons/fa';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import './Overheads.css';

export default function Overheads() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Operating'); // Operating, Recurring, Vendors

  const overheadStats = [
    { label: "Total Overhead (YTD)", value: "GHS 142,500", trend: "+12%", type: "up" },
    { label: "Monthly Average", value: "GHS 24,000", trend: "-5%", type: "down" },
    { label: "Pending Bills", value: "GHS 8,200", trend: "3 Due", type: "neutral" },
  ];

  const trendData = [
    { month: 'Jan', amount: 22000 },
    { month: 'Feb', amount: 25000 },
    { month: 'Mar', amount: 21000 },
    { month: 'Apr', amount: 24000 },
    { month: 'May', amount: 28000 },
    { month: 'Jun', amount: 24500 },
  ];

  const categoryData = [
    { name: 'Rent', value: 45000, color: '#1a1a1a' },
    { name: 'Utilities', value: 22000, color: '#d91e18' },
    { name: 'Admin', value: 15000, color: '#2ecc71' },
    { name: 'IT/Internet', value: 35000, color: '#3498db' },
    { name: 'HR/Welfare', value: 25500, color: '#f1c40f' },
  ];

  const expenses = [
    { date: "12 Jun 2025", category: "Rent", sub: "Office Rent", desc: "Monthly building lease", amount: "GHS 15,000", vendor: "Asset Prime Ltd", method: "Bank Transfer" },
    { date: "14 Jun 2025", category: "IT", sub: "Internet", desc: "Vodafone Fiber monthly subscription", amount: "GHS 850", vendor: "Vodafone Ghana", method: "Direct Debit" },
    { date: "15 Jun 2025", category: "Utilities", sub: "Electricity", desc: "ECG Prepaid credit", amount: "GHS 2,200", vendor: "ECG", method: "Mobile Money" },
  ];

  const recurring = [
    { item: "Office Rent", frequency: "Monthly", amount: "GHS 15,000", nextDue: "01 Jul 2025", status: "Active" },
    { item: "Microsoft 365", frequency: "Yearly", amount: "GHS 4,500", nextDue: "10 Aug 2025", status: "Active" },
    { item: "Internet Fiber", frequency: "Monthly", amount: "GHS 850", nextDue: "14 Jul 2025", status: "Active" },
  ];

  const vendors = [
    { name: "ECG", category: "Utilities", totalSpent: "GHS 12,400", billsCount: 6 },
    { name: "Vodafone Ghana", category: "IT", totalSpent: "GHS 5,100", billsCount: 6 },
    { name: "Asset Prime Ltd", category: "Rent", totalSpent: "GHS 90,000", billsCount: 6 },
  ];

  return (
    <div className="dashboard overheads-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
             <div className="title-area">
                <h1>Overhead Operating Costs</h1>
                <p>Track all non-project/case expenses and operating insights.</p>
             </div>
             <div className="action-buttons">
                <button className="black-btn" onClick={() => setShowCreateModal(true)}>
                   <FaPlus /> Create Overhead Expense
                </button>
             </div>
          </div>

          <div className="overheads-summary-grid">
             {overheadStats.map((stat, i) => (
               <div key={i} className="overhead-stat-card">
                  <span className="stat-label">{stat.label}</span>
                  <div className="stat-val-row">
                     <span className="stat-val">{stat.value}</span>
                     <span className={`stat-trend ${stat.type}`}>
                        {stat.type === 'up' ? <FaArrowUp /> : stat.type === 'down' ? <FaArrowDown /> : <FaCalendarAlt />}
                        {stat.trend}
                     </span>
                  </div>
               </div>
             ))}
          </div>

          <div className="overheads-charts-row">
             <div className="chart-box main-chart">
                <div className="chart-header">
                   <h3>Monthly Overhead Trend</h3>
                </div>
                <div className="chart-wrapper">
                   <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={trendData}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                         <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                         <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                         <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                         <Line type="monotone" dataKey="amount" stroke="#1a1a1a" strokeWidth={3} dot={{r: 4, fill: '#1a1a1a', strokeWidth: 2}} activeDot={{r: 6}} />
                      </LineChart>
                   </ResponsiveContainer>
                </div>
             </div>

             <div className="chart-box pie-chart-box">
                <div className="chart-header">
                   <h3>Category Breakdown</h3>
                </div>
                <div className="chart-wrapper">
                   <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                         <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Pie>
                         <Tooltip />
                         <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>

          <div className="ai-insights-row">
             <div className="ai-bubble">
                <div className="ai-icon">✨</div>
                <div className="ai-text">
                   <strong>Cost Alert:</strong> IT subscriptions have increased by 15% this quarter. Suggest reviewing unused SaaS licenses.
                </div>
             </div>
             <div className="ai-bubble">
                <div className="ai-icon">✨</div>
                <div className="ai-text">
                   <strong>Saving Area:</strong> Switching to a quarterly utility payment plan could save approximately GHS 1,200 annually.
                </div>
             </div>
          </div>

          <div className="overheads-tabs">
             <button className={`tab-btn ${activeTab === 'Operating' ? 'active' : ''}`} onClick={() => setActiveTab('Operating')}>Operating Expenses</button>
             <button className={`tab-btn ${activeTab === 'Recurring' ? 'active' : ''}`} onClick={() => setActiveTab('Recurring')}>Recurring</button>
             <button className={`tab-btn ${activeTab === 'Vendors' ? 'active' : ''}`} onClick={() => setActiveTab('Vendors')}>Vendor History</button>
          </div>

          <div className="tab-content">
             {activeTab === 'Operating' && (
               <div className="table-card">
                  <table className="refined-table">
                     <thead>
                        <tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Vendor</th><th>Method</th><th>Actions</th></tr>
                     </thead>
                     <tbody>
                        {expenses.map((exp, i) => (
                           <tr key={i}>
                              <td>{exp.date}</td>
                              <td className="cat-cell">
                                 <span className="main-cat">{exp.category}</span>
                                 <span className="sub-cat">{exp.sub}</span>
                              </td>
                              <td>{exp.desc}</td>
                              <td className="amount-cell">{exp.amount}</td>
                              <td>{exp.vendor}</td>
                              <td>{exp.method}</td>
                              <td><button className="link-btn">receipt</button></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
             )}

             {activeTab === 'Recurring' && (
               <div className="table-card">
                  <table className="refined-table">
                     <thead>
                        <tr><th>Item</th><th>Frequency</th><th>Amount</th><th>Next Due Date</th><th>Status</th><th>Actions</th></tr>
                     </thead>
                     <tbody>
                        {recurring.map((rec, i) => (
                           <tr key={i}>
                              <td>{rec.item}</td>
                              <td>{rec.frequency}</td>
                              <td className="amount-cell">{rec.amount}</td>
                              <td>{rec.nextDue}</td>
                              <td><span className="status-badge paid">{rec.status}</span></td>
                              <td><button className="link-btn">edit</button></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
             )}

             {activeTab === 'Vendors' && (
               <div className="table-card">
                  <table className="refined-table">
                     <thead>
                        <tr><th>Vendor Name</th><th>Primary Category</th><th>Total Spent (YTD)</th><th>Bills Count</th><th>Actions</th></tr>
                     </thead>
                     <tbody>
                        {vendors.map((v, i) => (
                           <tr key={i}>
                              <td>{v.name}</td>
                              <td>{v.category}</td>
                              <td className="amount-cell">{v.totalSpent}</td>
                              <td>{v.billsCount}</td>
                              <td><button className="link-btn">history</button></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
             )}
          </div>
        </div>
      </div>

      {showCreateModal && (
         <div className="preview-overlay">
            <div className="request-modal overhead-form">
               <div className="preview-header">
                  <h3>Create Overhead Expense</h3>
                  <button onClick={() => setShowCreateModal(false)} className="close-btn">×</button>
               </div>
               <div className="step-body">
                  <div className="form-grid">
                     <div className="form-group">
                        <label>Date</label>
                        <input type="date" className="refined-input" defaultValue="2025-06-15" />
                     </div>
                     <div className="form-group">
                        <label>Category</label>
                        <select className="refined-select">
                           <option>Rent</option>
                           <option>Utilities</option>
                           <option>Admin</option>
                           <option>IT</option>
                           <option>HR</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <label>Sub-Category</label>
                        <select className="refined-select">
                           <option>Office Rent</option>
                           <option>Electricity</option>
                           <option>Internet</option>
                           <option>Stationery</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <label>Amount (GHS)</label>
                        <input type="number" className="refined-input" placeholder="0.00" />
                     </div>
                     <div className="form-group wide">
                        <label>Description</label>
                        <input type="text" className="refined-input" placeholder="e.g. Monthly internet subscription" />
                     </div>
                     <div className="form-group">
                        <label>Vendor (Optional)</label>
                        <input type="text" className="refined-input" placeholder="e.g. Vodafone" />
                     </div>
                     <div className="form-group">
                        <label>Paid Via</label>
                        <select className="refined-select">
                           <option>Bank Account</option>
                           <option>Cash</option>
                           <option>Mobile Money</option>
                        </select>
                     </div>
                  </div>
                  <div className="upload-field" onClick={() => {}}>
                     <FaCloudUploadAlt /> Attach Receipt / Proof
                  </div>
                  <div className="form-footer">
                     <button className="black-btn wide" onClick={() => setShowCreateModal(false)}>Save Overhead</button>
                  </div>
               </div>
            </div>
         </div>
      )}
      <ChatWidget />
    </div>
  );
}
