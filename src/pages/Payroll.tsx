import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaPlus, FaDownload, FaEnvelope, FaEye, FaCheckCircle, 
  FaUserFriends, FaMoneyBillWave, FaPercentage
} from 'react-icons/fa';
import './Payroll.css';

interface Employee {
  id: string;
  name: string;
  role: string;
  basic: number;
  allowance: number;
  tax: number;
  ssnit: number;
  net: number;
}

export default function Payroll() {
  const [activeTab, setActiveTab] = useState('Processing'); // Processing, Setup, History
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [showPayslip, setShowPayslip] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = [
    { id: 'EMP001', name: 'Kwadena Mamphcy', role: 'Project Coordinator', basic: 8500, allowance: 1200, tax: 1450, ssnit: 467, net: 7783 },
    { id: 'EMP002', name: 'Ama Serwaa', role: 'Lead Architect', basic: 10500, allowance: 1500, tax: 1800, ssnit: 577, net: 9623 },
    { id: 'EMP003', name: 'Kofi Mensah', role: 'Consultant', basic: 12000, allowance: 2000, tax: 2100, ssnit: 660, net: 11240 },
  ];

  const payrollSummary = {
    gross: "GHS 35,200",
    deductions: "GHS 7,054",
    netPay: "GHS 28,146",
    status: "Draft"
  };

  const openPayslip = (emp: Employee) => {
    setSelectedEmployee(emp);
    setShowPayslip(true);
  };

  return (
    <div className="dashboard payroll-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
             <div className="title-area">
                <h1>Payroll Management</h1>
                <p>Manage staff compensation, statutory deductions, and payslips.</p>
             </div>
             <div className="action-buttons">
                <button className="export-btn"><FaDownload /> Export PDF</button>
                <button className="black-btn"><FaPlus /> Add Employee</button>
             </div>
          </div>

          <div className="payroll-stats-grid">
             <div className="p-stat-card">
                <FaUserFriends className="p-icon" />
                <div className="p-info">
                   <span className="p-label">Total Staff</span>
                   <span className="p-val">12</span>
                </div>
             </div>
             <div className="p-stat-card">
                <FaMoneyBillWave className="p-icon" />
                <div className="p-info">
                   <span className="p-label">Total Gross</span>
                   <span className="p-val">{payrollSummary.gross}</span>
                </div>
             </div>
             <div className="p-stat-card">
                <FaPercentage className="p-icon" />
                <div className="p-info">
                   <span className="p-label">Total Deductions</span>
                   <span className="p-val">{payrollSummary.deductions}</span>
                </div>
             </div>
             <div className="p-stat-card blue">
                <FaCheckCircle className="p-icon" />
                <div className="p-info">
                   <span className="p-label">Total Net Pay</span>
                   <span className="p-val">{payrollSummary.netPay}</span>
                </div>
             </div>
          </div>

          <div className="payroll-tabs">
             <button className={`tab-btn ${activeTab === 'Processing' ? 'active' : ''}`} onClick={() => setActiveTab('Processing')}>Monthly Processing</button>
             <button className={`tab-btn ${activeTab === 'Setup' ? 'active' : ''}`} onClick={() => setActiveTab('Setup')}>Salary Structure</button>
             <button className={`tab-btn ${activeTab === 'History' ? 'active' : ''}`} onClick={() => setActiveTab('History')}>Payment History</button>
          </div>

          <div className="tab-content">
             {activeTab === 'Processing' && (
               <div className="processing-container">
                  <div className="processing-header">
                     <div className="month-selector">
                        <span>Processing for:</span>
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                           <option>June 2025</option>
                           <option>May 2025</option>
                           <option>April 2025</option>
                        </select>
                     </div>
                     <button className="run-payroll-btn">Run Payroll & Post to Finance</button>
                  </div>

                  <div className="table-card">
                     <table className="refined-table">
                        <thead>
                           <tr><th>Employee</th><th>Basic Salary</th><th>Allowances</th><th>Deductions</th><th>Net Pay</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                           {employees.map((emp) => (
                              <tr key={emp.id}>
                                 <td>
                                    <div className="emp-cell">
                                       <span className="emp-name">{emp.name}</span>
                                       <span className="emp-role">{emp.role}</span>
                                    </div>
                                 </td>
                                 <td>GHS {emp.basic.toLocaleString()}</td>
                                 <td>GHS {emp.allowance.toLocaleString()}</td>
                                 <td className="red">- GHS {(emp.tax + emp.ssnit).toLocaleString()}</td>
                                 <td className="bold">GHS {emp.net.toLocaleString()}</td>
                                 <td>
                                    <div className="table-links">
                                       <button className="link-btn" onClick={() => openPayslip(emp)}><FaEye /> payslip</button>
                                       <button className="link-btn"><FaEnvelope /> email</button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
             )}

             {activeTab === 'Setup' && (
               <div className="setup-container">
                  <div className="setup-grid">
                     <div className="setup-card">
                        <h3>Statutory Rules</h3>
                        <div className="rule-item">
                           <span>Income Tax (PAYE)</span> <span className="status-badge paid">Ghana Revenue Authority</span>
                        </div>
                        <div className="rule-item">
                           <span>SSNIT (13.5%)</span> <span className="status-badge paid">Tier 1 & 2 Enabled</span>
                        </div>
                        <button className="link-btn mt-10">Configure Tax Rules</button>
                     </div>
                     <div className="setup-card">
                        <h3>Finance Link</h3>
                        <p>Automatically post summarized payroll to Overheads.</p>
                        <div className="link-item">
                           <span>Target: Overheads (Staff Welfare)</span>
                           <span className="status-badge paid">Active</span>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'History' && (
               <div className="table-card">
                  <table className="refined-table">
                     <thead>
                        <tr><th>Month</th><th>Total Paid</th><th>Staff Count</th><th>Date Processed</th><th>Status</th></tr>
                     </thead>
                     <tbody>
                        <tr><td>May 2025</td><td>GHS 27,900</td><td>12</td><td>31 May 2025</td><td><span className="status-badge paid">Paid</span></td></tr>
                        <tr><td>April 2025</td><td>GHS 27,900</td><td>12</td><td>30 Apr 2025</td><td><span className="status-badge paid">Paid</span></td></tr>
                     </tbody>
                  </table>
               </div>
             )}
          </div>
        </div>
      </div>

      {showPayslip && selectedEmployee && (
        <div className="preview-overlay">
           <div className="payslip-modal">
              <div className="preview-header">
                 <h3>Payslip: {selectedEmployee.name}</h3>
                 <button onClick={() => setShowPayslip(false)} className="close-btn">×</button>
              </div>
              <div className="payslip-body">
                 <div className="payslip-doc">
                    <div className="payslip-header">
                       <h2>MTN WORKSPACE</h2>
                       <p>Official Payslip - {selectedMonth}</p>
                    </div>
                    <div className="payslip-meta">
                       <p><strong>Employee:</strong> {selectedEmployee.name}</p>
                       <p><strong>Role:</strong> {selectedEmployee.role}</p>
                    </div>
                    <hr />
                    <div className="payslip-grid">
                       <div className="section">
                          <h4>Earnings</h4>
                          <div className="line"><span>Basic Salary</span> <span>GHS {selectedEmployee.basic.toLocaleString()}</span></div>
                          <div className="line"><span>Allowances</span> <span>GHS {selectedEmployee.allowance.toLocaleString()}</span></div>
                          <hr />
                          <div className="line bold"><span>Gross Pay</span> <span>GHS {(selectedEmployee.basic + selectedEmployee.allowance).toLocaleString()}</span></div>
                       </div>
                       <div className="section">
                          <h4>Deductions</h4>
                          <div className="line"><span>Income Tax (PAYE)</span> <span>- GHS {selectedEmployee.tax.toLocaleString()}</span></div>
                          <div className="line"><span>SSNIT Employee</span> <span>- GHS {selectedEmployee.ssnit.toLocaleString()}</span></div>
                          <hr />
                          <div className="line bold"><span>Total Deductions</span> <span>- GHS {(selectedEmployee.tax + selectedEmployee.ssnit).toLocaleString()}</span></div>
                       </div>
                    </div>
                    <div className="payslip-footer">
                       <div className="total-net">
                          <span>NET PAY</span>
                          <span className="amount">GHS {selectedEmployee.net.toLocaleString()}</span>
                       </div>
                    </div>
                 </div>
                 <div className="payslip-actions">
                    <button className="black-btn wide"><FaDownload /> Download PDF</button>
                    <button className="outline-btn wide"><FaEnvelope /> Email to Staff</button>
                 </div>
              </div>
           </div>
        </div>
      )}
      <ChatWidget />
    </div>
  );
}
