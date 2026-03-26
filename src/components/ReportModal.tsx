import { useState } from 'react';
import { FaInfoCircle, FaSearch, FaTimes } from 'react-icons/fa';
import './ReportModal.css';

interface ReportModalProps {
  onClose: () => void;
  onGenerate: (config: any) => void;
}

export default function ReportModal({ onClose, onGenerate }: ReportModalProps) {
  const [reportType, setReportType] = useState('Profit & Loss');
  const [dateRange, setDateRange] = useState('this month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState(['All Accounts']);
  const [projectSearch, setProjectSearch] = useState('');

  const reportTypes = [
    'Profit & Loss', 'Balance Sheet', 'Cash Flow statement',
    'Unaudited financial statement', 'Trial balance', 'Account Activity',
    'Receivable & Payable Report', 'Ratio Analysis', 'Project Financial Report', 'Payroll Report'
  ];

  const dateRanges = ['this month', 'last month', 'Q1', 'Q2', 'Q3', 'Q4', 'year to date', 'custom'];

  const accounts = ['Main Operations', 'Savings Account', 'Petty Cash', 'Project Fund A'];

  return (
    <div className="modal-overlay">
      <div className="report-modal">
        <div className="modal-header">
          <h2>Generate Financial Report</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Date Range</label>
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                {dateRanges.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            {dateRange === 'custom' && (
              <div className="form-group flex-2 custom-dates">
                 <div className="date-input">
                    <label>Start</label>
                    <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} />
                 </div>
                 <div className="date-input">
                    <label>End</label>
                    <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} />
                 </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="label-with-info">
              Accounts to include
              <div className="info-trigger">
                <FaInfoCircle />
                <span className="tooltip">The report uses only transactions paid/received via the selected account(s).</span>
              </div>
            </label>
            <div className="multi-select-shell">
              <select multiple value={selectedAccounts} onChange={(e) => 
                setSelectedAccounts(Array.from(e.target.selectedOptions, option => option.value))
              }>
                <option value="All Accounts">All Accounts (Default)</option>
                {accounts.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <span className="select-hint">Hold Ctrl to select multiple</span>
            </div>
          </div>

          {reportType === 'Project Financial Report' && (
            <div className="form-group">
              <label>Search Project</label>
              <div className="search-input-wrap">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Type to search projects..." 
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onGenerate({ reportType, dateRange })}>Generate Report</button>
        </div>
      </div>
    </div>
  );
}
