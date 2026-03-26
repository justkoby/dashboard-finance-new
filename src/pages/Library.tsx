import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaSearch, FaFolder, FaFileAlt, FaDownload, FaHistory, FaFilter, FaFilePdf, FaFileExcel
} from 'react-icons/fa';
import './Library.css';

export default function Library() {
  const [activeFolder, setActiveFolder] = useState('2025');

  const folders = [
    { id: '2025', name: 'Financial Year 2025', count: 145 },
    { id: '2024', name: 'Financial Year 2024', count: 520 },
    { id: '2023', name: 'Financial Year 2023', count: 480 },
    { id: 'tax', name: 'Tax Filings & Returns', count: 24 },
    { id: 'reports', name: 'Audit Reports', count: 12 },
  ];

  const archivedFiles = [
    { name: "Final_Audit_Report_2024.pdf", type: "pdf", size: "2.4 MB", date: "15 Jan 2025" },
    { name: "Global_Invoices_Q4_2024.xlsx", type: "excel", size: "1.1 MB", date: "02 Jan 2025" },
    { name: "PAYE_Filings_Dec_2024.pdf", type: "pdf", size: "850 KB", date: "28 Dec 2024" },
    { name: "Staff_Compensation_Summary_2024.xlsx", type: "excel", size: "920 KB", date: "20 Dec 2024" },
    { name: "SSNIT_Tier1_Returns_Dec.pdf", type: "pdf", size: "1.2 MB", date: "15 Dec 2024" },
  ];

  return (
    <div className="dashboard library-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
             <div className="title-area">
                <h1>Library (Financial Records)</h1>
                <p>Access archived financial documents, past reports, and historical tax records.</p>
             </div>
             <div className="action-buttons">
                <button className="black-btn"><FaDownload /> Bulk Export</button>
             </div>
          </div>

          <div className="library-layout">
             <div className="folders-sidebar">
                <h3>Archive Folders</h3>
                <div className="folder-list">
                   {folders.map(f => (
                      <button 
                        key={f.id} 
                        className={`folder-item ${activeFolder === f.id ? 'active' : ''}`}
                        onClick={() => setActiveFolder(f.id)}
                      >
                         <FaFolder className="f-icon" />
                         <div className="f-info">
                            <span className="f-name">{f.name}</span>
                            <span className="f-count">{f.count} files</span>
                         </div>
                      </button>
                   ))}
                </div>
             </div>

             <div className="files-explorer">
                <div className="explorer-header">
                   <div className="search-box">
                      <FaSearch className="s-icon" />
                      <input type="text" placeholder="Search archive..." />
                   </div>
                   <div className="explorer-actions">
                      <button className="icon-btn"><FaFilter  /></button>
                      <button className="icon-btn"><FaHistory /></button>
                   </div>
                </div>

                <div className="table-card">
                   <table className="refined-table">
                      <thead>
                         <tr>
                            <th>File Name</th>
                            <th>Date Archived</th>
                            <th>Size</th>
                            <th>Type</th>
                            <th>Actions</th>
                         </tr>
                      </thead>
                      <tbody>
                         {archivedFiles.map((file, i) => (
                            <tr key={i}>
                               <td className="file-name-cell">
                                  {file.type === 'pdf' ? <FaFilePdf className="type-icon pdf" /> : <FaFileExcel className="type-icon excel" />}
                                  <span>{file.name}</span>
                               </td>
                               <td>{file.date}</td>
                               <td>{file.size}</td>
                               <td className="uppercase">{file.type}</td>
                               <td>
                                  <div className="table-links">
                                     <button className="link-btn">view</button>
                                     <button className="link-btn">download</button>
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
      </div>
      <ChatWidget />
    </div>
  );
}
