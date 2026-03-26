import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ExpenseTable from "../components/ExpenseTable";
import ChatWidget from "../components/ChatWidget";
import ReportModal from "../components/ReportModal";
import ReportViewer from "../components/ReportViewer";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { 
  FaDownload, FaEllipsisV, FaPlus, FaFileAlt, 
  FaBell, FaRobot, FaHistory, FaSpinner 
} from "react-icons/fa";
import { motion } from "framer-motion";

import "./Dashboard.css";

const incomeData = [
  { month: "Jan", income: 180000, expense: 95000 },
  { month: "Feb", income: 210000, expense: 110000 },
  { month: "Mar", income: 195000, expense: 130000 },
  { month: "Apr", income: 240000, expense: 160000 },
  { month: "May", income: 220000, expense: 150000 },
  { month: "Jun", income: 260000, expense: 180000 },
  { month: "Jul", income: 280000, expense: 170000 },
  { month: "Aug", income: 270000, expense: 190000 },
  { month: "Sep", income: 290000, expense: 200000 },
  { month: "Oct", income: 310000, expense: 220000 },
  { month: "Nov", income: 330000, expense: 210000 },
  { month: "Dec", income: 350000, expense: 230000 },
];

const expenseBreakdown = [
  { name: "Project Expenses", value: 65, color: "#1a3353" },
  { name: "Overhead Expenses", value: 35, color: "#d91e18" },
];

const categories = [
  { name: "Transport", value: 280000 },
  { name: "Per Diem", value: 160000 },
  { name: "Ext Consultants", value: 85000 },
  { name: "Rent", value: 65000 },
  { name: "Internet", value: 45000 }
];

const axiosStyle = {
  fontSize: 10,
  fill: "#9a9792",
};

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const [showReportModal, setShowReportModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewingReport, setViewingReport] = useState<any>(null);

  const handleGenerateClick = () => setShowReportModal(true);

  const handleRunReport = (config: any) => {
    setShowReportModal(false);
    setIsGenerating(true);
    
    // simulate loading/generation
    setTimeout(() => {
      setIsGenerating(false);
      setViewingReport(config);
    }, 1500);
  };

  const handleBackToDashboard = () => {
    setViewingReport(null);
  };

  if (viewingReport) {
    return <ReportViewer config={viewingReport} onBack={handleBackToDashboard} />;
  }

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="main">
          <Header />

          <div className="content">
            <div className="page-toolbar">
              <div className="page-heading">
                <h1>Finance Dashboard</h1>
              </div>

              <div className="page-actions">
                <button className="page-btn page-btn-primary">
                  <FaPlus /> <span>New Expense</span>
                </button>
                <button className="page-btn" onClick={handleGenerateClick}>
                  <FaFileAlt /> <span>Generate Report</span>
                </button>
                <button className="page-btn">
                  <FaDownload /> <span>Export</span>
                </button>
                <button className="page-icon-btn" aria-label="More actions">
                  <FaEllipsisV />
                </button>
              </div>
            </div>

            {/* STATS */}
            <motion.div 
              className="stats-row"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <StatCard
                  title="Total Income (YTD)"
                  value="GHS 5,200,000"
                  change="+13.38%"
                  positive
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <StatCard
                  title="Total Expenses (YTD)"
                  value="GHS 4,100,000"
                  change="+13.38%"
                  positive
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <StatCard
                  title="Active Projects"
                  value="12"
                  change="4 clients"
                  positive
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <StatCard
                  title="Pending Receivables"
                  value="GHS 185,000"
                  change="8 overdue"
                  positive={false}
                />
              </motion.div>
            </motion.div>

            {/* ALERTS & INSIGHTS ROW */}
            <motion.div 
              className="alerts-insights-grid"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-box alerts-panel">
                <div className="card-header">
                  <FaBell className="header-icon alert" />
                  <h3>Action Items / Alerts</h3>
                </div>
                <ul className="alert-list">
                  <li className="alert-item warn">
                    <span className="alert-text">Invoice #INV-023 – 45 days overdue</span>
                    <span className="alert-date">Today</span>
                  </li>
                  <li className="alert-item">
                    <span className="alert-text">Rent Due: GHS 12,000</span>
                    <span className="alert-date">In 2 days</span>
                  </li>
                  <li className="alert-item danger">
                    <span className="alert-text">Galamsey Cleanup Project over budget</span>
                    <span className="alert-date">Priority</span>
                  </li>
                  <li className="alert-item info">
                    <span className="alert-text">PAYE due in 5 days</span>
                    <span className="alert-date">Reminder</span>
                  </li>
                </ul>
              </div>

              <div className="card-box insights-panel">
                <div className="card-header">
                  <FaRobot className="header-icon insight" />
                  <h3>AI Insights</h3>
                </div>
                <div className="insight-content">
                  <div className="insight-bubble">
                    "Your transport expenses increased 20% compared to last quarter."
                  </div>
                  <div className="insight-bubble">
                    "Project Metro Rail Ph1 has a high spend rate and may exceed its budget in 2 months."
                  </div>
                </div>
              </div>

              <div className="card-box quick-reports">
                <div className="card-header">
                  <FaHistory className="header-icon history" />
                  <h3>Recent Reports</h3>
                </div>
                <div className="report-links">
                  <a href="#" className="report-link" onClick={() => handleRunReport({reportType: 'Profit & Loss', dateRange: 'last month'})}>
                    Profit & Loss – Last Quarter
                  </a>
                  <a href="#" className="report-link" onClick={() => handleRunReport({reportType: 'Project Financial Report', dateRange: 'year to date'})}>
                    Project Profitability – 2026
                  </a>
                  <a href="#" className="report-link" onClick={() => handleRunReport({reportType: 'Receivable & Payable Report', dateRange: 'this month'})}>
                    Invoice Aging – Current Month
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CHARTS ROW 1 */}
            <div className="charts-grid upper">
              <div className="chart-card wide">
                <div className="chart-header">
                  <h3>Income vs. Expenditure</h3>
                  <button className="chart-filter">Filter ▾</button>
                </div>
                <div className="chart-viewport">
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={incomeData}>
                      <CartesianGrid vertical={false} stroke="#e4e0da" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={axiosStyle}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={axiosStyle}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#1a3353" 
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#fff", stroke: "#1a3353", strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expense" 
                        stroke="#d91e18" 
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#fff", stroke: "#d91e18", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card narrow">
                <div className="chart-header">
                  <h3>Expense Breakdown</h3>
                </div>
                <div className="chart-viewport pie-container">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        dataKey="value"
                        outerRadius={80}
                        stroke="none"
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pie-legend">
                     {expenseBreakdown.map((item, i) => (
                       <div key={i} className="legend-item">
                         <span className="dot" style={{ backgroundColor: item.color }}></span>
                         <span className="label">{item.name}</span>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CHARTS ROW 2 */}
            <div className="charts-grid lower">
              <div className="chart-card wide">
                <div className="chart-header">
                  <h3>Top 5 Expense Categories</h3>
                  <button className="chart-filter">Filter ▾</button>
                </div>
                <div className="chart-viewport">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={categories}>
                      <CartesianGrid vertical={false} stroke="#e4e0da" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={axiosStyle}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={axiosStyle}
                      />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1a3353" radius={[4, 4, 0, 0]} barSize={60} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card narrow">
                 <ExpenseTable title="Project Profitability Snapshot" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />

      {showReportModal && (
        <ReportModal 
          onClose={() => setShowReportModal(false)}
          onGenerate={handleRunReport}
        />
      )}

      {isGenerating && (
        <div className="loading-overlay">
          <div className="loading-content">
            <FaSpinner className="spinner" />
            <p>Generating your report...</p>
          </div>
        </div>
      )}
    </>
  );
}
