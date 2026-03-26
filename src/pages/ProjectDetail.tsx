import { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaChevronDown, FaPlus, FaEllipsisV, FaRegFolder, FaRegCheckCircle, 
  FaRegPlayCircle, FaRegClock, FaUsers, FaCloudUploadAlt, FaTimes
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import './ProjectDetail.css';

interface PaymentRequest {
  id: string;
  desc: string;
  date: string;
  amount: number;
}

export default function ProjectDetail() {
  const [filter, setFilter] = useState('Monthly');
  const [showPreview, setShowPreview] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  
  // Payment Request States
  const [showRequestList, setShowRequestList] = useState(false);
  const [activeRequest, setActiveRequest] = useState<PaymentRequest | null>(null);
  const [modalStep, setModalStep] = useState('list'); // list, detail, decline, approve
  const [declineReason, setDeclineReason] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Transport');
  const [isReimbursable, setIsReimbursable] = useState('Yes');

  const [expenses, setExpenses] = useState([
    { date: "15 Mar 2025", category: "Transport", description: "Site visit travel", amount: "GHS 1,200", paidBy: "Staff" }
  ]);

  const mockRequests = [
    { id: 'REQ-001', desc: 'Request for Funds', date: '22 Jan 2025', amount: 5000 },
    { id: 'REQ-001', desc: 'Request for transport', date: '10 Mar 2025', amount: 20000 },
    { id: 'REQ-001', desc: 'Request for medical fees', date: '10 Mar 2025', amount: 2000 },
  ];

  const project = {
    name: "Presbyterian Kutunse Conference Center Development",
    client: "DERRER ENERGY GHANA LIMITED",
    coordinator: "KWADENA MAMPHCY",
    startDate: "MONDAY, 16 JUNE 2025",
    deadline: "21 SEPTEMBER 2025",
    status: "Ongoing",
    taskStats: [
      { label: "Total Task", value: "18", icon: FaRegFolder },
      { label: "Total Task Completed", value: "6", icon: FaRegCheckCircle },
      { label: "Ongoing Task", value: "5", icon: FaRegPlayCircle },
      { label: "Pending Task", value: "7", icon: FaRegClock },
      { label: "Total Assignees", value: "5", icon: FaUsers },
    ],
    finance: {
      contract: 620000,
      invoiced: 480000,
      received: 410000,
      expensesValue: 590000,
    }
  };

  const chartData = useMemo(() => [
    { name: 'Mar', income: 120000, expenses: 95000 },
    { name: 'Apr', income: 150000, expenses: 140000 },
    { name: 'May', income: 140000, expenses: 180000 },
    { name: 'Jun', income: 70000, expenses: 175000 },
  ], []);

  const metrics = useMemo(() => {
    const outstanding = project.finance.invoiced - project.finance.received;
    const currentExpenses = expenses.reduce((acc, exp) => acc + parseInt(exp.amount.replace(/[^0-9]/g, '')), 0) + project.finance.expensesValue;
    const profit = project.finance.received - currentExpenses;
    const margin = ((profit / project.finance.received) * 100).toFixed(1);
    
    return {
      contract: project.finance.contract.toLocaleString(),
      invoiced: project.finance.invoiced.toLocaleString(),
      received: project.finance.received.toLocaleString(),
      outstanding: outstanding.toLocaleString(),
      expenses: currentExpenses.toLocaleString(),
      profit: profit.toLocaleString(),
      margin: margin
    };
  }, [project.finance, expenses]);

  const handleApproveFinal = () => {
    if (!activeRequest) return;
    const newExpense = {
       date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
       category: expenseCategory,
       description: activeRequest.desc,
       amount: `GHS ${activeRequest.amount.toLocaleString()}`,
       paidBy: "Project Funds" // or "Staff" depending on reimbursable
    };
    setExpenses([newExpense, ...expenses]);
    setShowRequestList(false);
    setActiveRequest(null);
    setModalStep('list');
  };

  const openRequest = (req: any) => {
    setActiveRequest(req);
    setModalStep('detail');
  };

  return (
    <div className="project-detail-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="project-top-nav">
             <div className="project-title-area">
                <h1>{project.name}</h1>
                <div className="status-dropdown">
                   <span>{project.status}</span> <FaChevronDown className="chevron" />
                </div>
             </div>
             <div className="action-buttons">
                <button className="btn-secondary">View Project Plan</button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowRequestList(true)}
                >
                  Payment Request <FaPlus />
                </button>
                <button className="more-btn"><FaEllipsisV /></button>
             </div>
          </div>

          <div className="task-stats-bar">
             <div className="stats-row">
                {project.taskStats.map((stat, i) => (
                  <div key={i} className="task-stat">
                    <stat.icon className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-val">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
             </div>
             <button className="create-task-btn"><FaPlus /> Create Task</button>
          </div>

          <div className="project-info-grid">
             <div className="about-project-card">
                <h3>About Project</h3>
                <p className="description">
                  Comprehensive development management for the Kutunse hub. Focus on renewable energy integration and community-centric infrastructure design.
                </p>
                <div className="tags">
                   <span className="tag blue">EDP and SolarPower Production</span>
                   <span className="tag green">SSDP</span>
                </div>
                <div className="metadata-grid">
                   <div className="meta-item">
                      <span className="m-label">COORDINATOR</span>
                      <span className="m-val">{project.coordinator}</span>
                   </div>
                   <div className="meta-item">
                      <span className="m-label">CLIENT</span>
                      <span className="m-val">{project.client}</span>
                   </div>
                   <div className="meta-item">
                      <span className="m-label">START DATE</span>
                      <span className="m-val">{project.startDate}</span>
                   </div>
                   <div className="meta-item">
                      <span className="m-label">DEADLINE</span>
                      <span className="m-val red">{project.deadline}</span>
                   </div>
                </div>
             </div>

             <div className="upload-documents-card">
                <h3>Upload Documents</h3>
                <div className={`upload-zone ${uploadStatus}`} onClick={() => { setUploadStatus('uploading'); setTimeout(() => setUploadStatus('success'), 2000); }}>
                   {uploadStatus === 'idle' && <><FaCloudUploadAlt className="upload-icon" /><p>Drag or click to upload</p></>}
                   {uploadStatus === 'uploading' && <><div className="spinner"></div><p>Uploading...</p></>}
                   {uploadStatus === 'success' && <><FaRegCheckCircle className="success-icon" /><p>Upload Complete!</p></>}
                </div>
             </div>
          </div>

          <div className="financial-summary-horizontal">
             <div className="fin-stat">
                <span className="fin-label">Contract Amount</span>
                <span className="fin-val">GHS {metrics.contract}</span>
             </div>
             <div className="fin-stat">
                <span className="fin-label">Total Invoiced</span>
                <span className="fin-val">GHS {metrics.invoiced}</span>
             </div>
             <div className="fin-stat">
                <span className="fin-label">Total Received</span>
                <span className="fin-val">GHS {metrics.received}</span>
             </div>
             <div className="fin-stat">
                <span className="fin-label">Outstanding Balance</span>
                <span className="fin-val">GHS {metrics.outstanding}</span>
             </div>
             <div className="fin-stat">
                <span className="fin-label">Total Expenses</span>
                <span className="fin-val">GHS {metrics.expenses}</span>
             </div>
             <div className="fin-stat">
                <span className="fin-label">Profit</span>
                <span className="fin-val">GHS {metrics.profit}</span>
             </div>
             <div className="fin-stat">
                <span className="fin-label">Profit Margin</span>
                <span className={`fin-val ${Number(metrics.margin) < 0 ? 'red' : 'green'}`}>{metrics.margin}%</span>
             </div>
          </div>

          <div className="project-chart-box">
             <div className="chart-header">
                <h3>Invoiced vs Expenses</h3>
                <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                   <option>Monthly</option>
                   <option>Quarterly</option>
                   <option>Yearly</option>
                </select>
             </div>
             <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                   <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                      <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} cursor={{fill: '#f8f9fa'}} />
                      <Legend verticalAlign="top" align="right" iconType="circle" />
                      <Bar dataKey="income" name="Invoiced" fill="#1a1a1a" radius={[4, 4, 0, 0]} barSize={32} />
                      <Bar dataKey="expenses" name="Expenses" fill="#d91e18" radius={[4, 4, 0, 0]} barSize={32} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="detail-tables-stack">
             <div className="table-card">
                <div className="table-header"><h3>Invoices</h3><button className="black-btn"><FaPlus /> Create Invoice</button></div>
                <table className="refined-table">
                   <thead><tr><th>Invoice #</th><th>Description</th><th>Date</th><th>Amount</th><th>Status</th><th>Due Date</th><th>Actions</th></tr></thead>
                   <tbody>
                      <tr>
                         <td>INV-001</td><td className="desc">Inception Report</td><td>10 Mar 2025</td><td>GHS 120,000</td><td><span className="status-badge paid">Paid</span></td><td>10 Apr 2025</td>
                         <td><div className="table-links"><button onClick={() => setShowPreview(true)} className="link-btn">view</button> <button className="link-btn">update</button></div></td>
                      </tr>
                   </tbody>
                </table>
             </div>

             <div className="table-card">
                <div className="table-header"><h3>Income / Receipts</h3><button className="black-btn"><FaPlus /> Add Payment</button></div>
                <table className="refined-table">
                   <thead><tr><th>Payment Date</th><th>Amount</th><th>Payment Method</th><th>Linked Invoice</th></tr></thead>
                   <tbody><tr><td>15 Mar 2025</td><td>GHS 120,000</td><td>Bank Transfer</td><td>INV-001</td></tr></tbody>
                </table>
             </div>

             <div className="table-card">
                <div className="table-header"><h3>Project Expenses</h3><button className="black-btn"><FaPlus /> Create Expense</button></div>
                <table className="refined-table">
                   <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Paid By</th></tr></thead>
                   <tbody>
                      {expenses.map((exp, i) => (
                        <tr key={i}><td>{exp.date}</td><td>{exp.category}</td><td>{exp.description}</td><td>{exp.amount}</td><td>{exp.paidBy}</td></tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>

      {/* PAYMENT REQUEST MODAL SYSTEM */}
      {showRequestList && (
        <div className="preview-overlay">
           <div className="request-modal">
              {modalStep === 'list' && (
                <>
                  <div className="preview-header">
                     <h3>Payment Request</h3>
                     <button onClick={() => setShowRequestList(false)} className="close-btn"><FaTimes /></button>
                  </div>
                  <div className="request-list-body">
                     <table className="refined-table simple">
                        <thead>
                           <tr><th>Request #</th><th>Description</th><th>Date</th><th>Amount</th><th></th></tr>
                        </thead>
                        <tbody>
                           {mockRequests.map((req, i) => (
                             <tr key={i}>
                                <td>{req.id}</td>
                                <td>{req.desc}</td>
                                <td>{req.date}</td>
                                <td>GHS {req.amount.toLocaleString()}</td>
                                <td><button onClick={() => openRequest(req)} className="link-btn">view</button></td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                </>
              )}

              {modalStep === 'detail' && activeRequest && (
                <div className="request-detail">
                   <div className="preview-header">
                      <h3>{activeRequest.desc}</h3>
                      <button onClick={() => setShowRequestList(false)} className="close-btn"><FaTimes /></button>
                   </div>
                   <div className="detail-actions">
                      <button className="approve-btn" onClick={() => setModalStep('approve')}>approve</button>
                      <button className="decline-btn" onClick={() => setModalStep('decline')}>Decline</button>
                   </div>
                </div>
              )}

              {modalStep === 'decline' && (
                <div className="decline-step">
                   <div className="preview-header">
                      <h3>Reason for Decline</h3>
                      <button onClick={() => setModalStep('detail')} className="close-btn"><FaTimes /></button>
                   </div>
                   <div className="step-body">
                      <textarea 
                        className="refined-textarea" 
                        placeholder="Indicate reason for declining..."
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                      ></textarea>
                      <div className="step-footer">
                         <button className="black-btn wide" onClick={() => setShowRequestList(false)}>Send</button>
                      </div>
                   </div>
                </div>
              )}

              {modalStep === 'approve' && (
                <div className="approve-step">
                   <div className="preview-header">
                      <h3>Select Expense Type/Category</h3>
                      <button onClick={() => setModalStep('detail')} className="close-btn"><FaTimes /></button>
                   </div>
                   <div className="step-body">
                      <div className="form-group">
                         <select className="refined-select" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
                            <option>Transport</option>
                            <option>Per Diem</option>
                            <option>Consultant Fees</option>
                            <option>Accommodation</option>
                         </select>
                      </div>
                      <div className="form-group">
                         <select className="refined-select" value={isReimbursable} onChange={(e) => setIsReimbursable(e.target.value)}>
                            <option>Reimbursable</option>
                            <option>Not Reimbursable</option>
                         </select>
                      </div>
                      <div className="step-footer">
                         <button className="black-btn wide" onClick={handleApproveFinal}>Send</button>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      )}

      {/* REPORT PREVIEW */}
      {showPreview && (
        <div className="preview-overlay">
           <div className="preview-modal">
              <div className="preview-header">
                 <h3>Generic Inception Report</h3>
                 <button onClick={() => setShowPreview(false)} className="close-btn"><FaTimes /></button>
              </div>
              <div className="preview-body">
                 <div className="report-doc">
                    <h1>Inception Report</h1>
                    <p><strong>Project:</strong> {project.name}</p>
                    <p><strong>Date:</strong> March 10, 2025</p>
                    <hr />
                    <h2>1. Project Overview</h2>
                    <p>This report marks the commencement of the development phase...</p>
                 </div>
              </div>
           </div>
        </div>
      )}
      <ChatWidget />
    </div>
  );
}
