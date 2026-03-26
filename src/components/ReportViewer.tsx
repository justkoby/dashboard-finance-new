import { FaDownload, FaFileExcel, FaPrint, FaSave, FaArrowLeft } from 'react-icons/fa';
import './ReportViewer.css';

interface ReportViewerProps {
  config: any;
  onBack: () => void;
}

export default function ReportViewer({ config, onBack }: ReportViewerProps) {
  const generatedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="report-viewer">
      <div className="viewer-navbar">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <div className="viewer-actions">
          <button className="action-btn pdf"><FaDownload /> Download PDF</button>
          <button className="action-btn excel"><FaFileExcel /> Export Excel</button>
          <button className="action-btn"><FaPrint /> Print</button>
          <button className="action-btn success"><FaSave /> Save to Library</button>
        </div>
      </div>

      <div className="report-canvas">
        <div className="report-paper">
          <div className="report-watermark">MTX WORKSPACE</div>
          <div className="report-header">
            <div className="report-title-section">
              <h1>{config.reportType || 'Financial Report'}</h1>
              <p className="report-meta">Date Generated: {generatedDate}</p>
            </div>
            <div className="report-filter-summary">
              <div className="filter-tag">Date Range: <strong>{config.dateRange}</strong></div>
              <div className="filter-tag">Accounts: <strong>All Accounts</strong></div>
            </div>
          </div>

          <div className="report-content-mock">
            <div className="mock-row header">
              <span>Account Description</span>
              <span>Balance (GHS)</span>
            </div>
            <div className="mock-section">
              <h4>Operating Income</h4>
              <div className="mock-row"><span>Project Revenue</span><span>5,200,000.00</span></div>
              <div className="mock-row subtotal"><span>Gross Income</span><span>5,200,000.00</span></div>
            </div>
            <div className="mock-section">
              <h4>Operating Expenses</h4>
              <div className="mock-row"><span>Salaries & Wages</span><span>2,800,000.00</span></div>
              <div className="mock-row"><span>Rent & Utilities</span><span>650,000.00</span></div>
              <div className="mock-row"><span>Transport & Logistics</span><span>280,000.00</span></div>
              <div className="mock-row"><span>External Consultants</span><span>85,000.00</span></div>
              <div className="mock-row subtotal"><span>Total Expenses</span><span>3,815,000.00</span></div>
            </div>
            <div className="mock-divider"></div>
            <div className="mock-row total">
              <span>Net Profit / (Loss)</span>
              <span>1,385,000.00</span>
            </div>
          </div>

          <div className="report-footer">
            <p>End of Report - Unaudited Internal Document</p>
          </div>
        </div>
      </div>
    </div>
  );
}
