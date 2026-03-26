import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaPlus, FaSearch, FaFilter, FaDownload, FaEllipsisV, 
  FaArrowUp, FaArrowDown, FaUniversity, FaWallet
} from 'react-icons/fa';
import './Cashbook.css';

export default function Cashbook() {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('All Accounts');

  const accounts = [
    { name: "Main Bank Account (GHS)", provider: "EcoBank", balance: "GHS 245,000", type: "bank" },
    { name: "USD Account", provider: "Standard Chartered", balance: "$ 12,500", type: "bank" },
    { name: "Petty Cash / Cashbox", provider: "Office Safe", balance: "GHS 3,200", type: "cash" },
  ];

  const transactions = [
    { date: "15 Mar 2025", desc: "Payment Received: DERRER ENERGY", category: "Project Income", method: "Bank Transfer", amount: "120,000", type: "in", balance: "245,000" },
    { date: "14 Mar 2025", desc: "June Staff Payroll", category: "Payroll", method: "Direct Debit", amount: "28,146", type: "out", balance: "125,000" },
    { date: "12 Mar 2025", desc: "Office Rent - June", category: "Overhead", method: "Cheque", amount: "15,000", type: "out", balance: "153,146" },
    { date: "10 Mar 2025", desc: "Stationery & Supplies", category: "Overhead", method: "Cash", amount: "450", type: "out", balance: "168,146" },
  ];

  return (
    <div className="dashboard cashbook-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
             <div className="title-area">
                <h1>Cashbook & Bank</h1>
                <p>Track all financial inflows and outflows across your firm's accounts.</p>
             </div>
             <div className="action-buttons">
                <button className="black-btn" onClick={() => setShowRecordModal(true)}>
                   <FaPlus /> Record Transaction
                </button>
             </div>
          </div>

          <div className="accounts-summary-row">
             {accounts.map((acc, i) => (
                <div key={i} className="account-card">
                   <div className="acc-icon-wrap">
                      {acc.type === 'bank' ? <FaUniversity /> : <FaWallet />}
                   </div>
                   <div className="acc-details">
                      <span className="acc-name">{acc.name}</span>
                      <span className="acc-prov">{acc.provider}</span>
                      <span className="acc-bal">{acc.balance}</span>
                   </div>
                </div>
             ))}
             <button className="add-account-btn">
                <FaPlus /> <span>Add Account</span>
             </button>
          </div>

          <div className="ledger-section">
             <div className="ledger-header">
                <h3>Transaction Ledger</h3>
                <div className="ledger-controls">
                   <div className="search-box">
                      <FaSearch className="s-icon" />
                      <input type="text" placeholder="Search transactions..." />
                   </div>
                   <select className="refined-select short" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                      <option>All Accounts</option>
                      <option>EcoBank Main</option>
                      <option>USD Account</option>
                      <option>Petty Cash</option>
                   </select>
                   <button className="icon-btn"><FaFilter /></button>
                   <button className="icon-btn"><FaDownload /></button>
                </div>
             </div>

             <div className="table-card">
                <table className="refined-table">
                   <thead>
                      <tr>
                         <th>Date</th>
                         <th>Description / Category</th>
                         <th>Method</th>
                         <th>In (GHS)</th>
                         <th>Out (GHS)</th>
                         <th>Balance</th>
                         <th></th>
                      </tr>
                   </thead>
                   <tbody>
                      {transactions.map((t, i) => (
                         <tr key={i}>
                            <td>{t.date}</td>
                            <td>
                               <div className="desc-cell">
                                  <span className="t-desc">{t.desc}</span>
                                  <span className="t-cat">{t.category}</span>
                               </div>
                            </td>
                            <td>{t.method}</td>
                            <td className="in-col">{t.type === 'in' ? `+ ${t.amount}` : ''}</td>
                            <td className="out-col">{t.type === 'out' ? `- ${t.amount}` : ''}</td>
                            <td className="bold">GHS {t.balance}</td>
                            <td><button className="more-btn"><FaEllipsisV /></button></td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>

      {showRecordModal && (
         <div className="preview-overlay">
            <div className="record-modal">
               <div className="preview-header">
                  <h3>Record New Transaction</h3>
                  <button onClick={() => setShowRecordModal(false)} className="close-btn">×</button>
               </div>
               <div className="step-body record-form">
                  <div className="type-selector">
                     <button className="t-type-btn in active"><FaArrowDown /> Receipt (Money In)</button>
                     <button className="t-type-btn out"><FaArrowUp /> Payment (Money Out)</button>
                  </div>
                  
                  <div className="form-grid">
                     <div className="form-group">
                        <label>Date</label>
                        <input type="date" className="refined-input" defaultValue="2025-03-15" />
                     </div>
                     <div className="form-group">
                        <label>Target Account</label>
                        <select className="refined-select">
                           <option>EcoBank Main Account (GHS)</option>
                           <option>Standard Chartered (USD)</option>
                           <option>Petty Cash</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <label>Category</label>
                        <select className="refined-select">
                           <option>Project Income</option>
                           <option>Retainer Fee</option>
                           <option>Internal Transfer</option>
                           <option>Other Income</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <label>Amount (GHS)</label>
                        <input type="number" className="refined-input" placeholder="0.00" />
                     </div>
                     <div className="form-group wide">
                        <label>Description / Reference</label>
                        <input type="text" className="refined-input" placeholder="e.g. Payment for Invoice #025" />
                     </div>
                     <div className="form-group">
                        <label>Payment Method</label>
                        <select className="refined-select">
                           <option>Bank Transfer</option>
                           <option>Cheque</option>
                           <option>Cash</option>
                           <option>POS</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <label>Link to Invoice (Optional)</label>
                        <select className="refined-select">
                           <option>None</option>
                           <option>INV-025 - GHS 45,000</option>
                           <option>INV-023 - GHS 28,000</option>
                        </select>
                     </div>
                  </div>

                  <div className="form-footer">
                     <button className="black-btn wide" onClick={() => setShowRecordModal(false)}>Save Transaction</button>
                  </div>
               </div>
            </div>
         </div>
      )}
      <ChatWidget />
    </div>
  );
}
