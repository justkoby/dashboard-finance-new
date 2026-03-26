import { FaFilter, FaExclamationTriangle } from 'react-icons/fa';
import './ExpenseTable.css';

interface ExpenseTableProps {
  title?: string;
}

export default function ExpenseTable({ title = "Salaries" }: ExpenseTableProps) {
  const data = [
    { project: "50MW Solar Dawe", budget: "1,004,200.85", actual: "800,524.00", spent: "750,558.55", profit: "49,965.45", margin: "25%", risk: false },
    { project: "Galamsey Cleanup", budget: "500,000.00", actual: "480,000.00", spent: "495,000.00", profit: "-15,000.00", margin: "-3%", risk: true },
    { project: "Accra Mall Reno", budget: "750,000.00", actual: "600,000.00", spent: "580,000.00", profit: "20,000.00", margin: "3%", risk: true },
    { project: "Metro Rail Ph1", budget: "1,200,000.00", actual: "900,000.00", spent: "850,000.00", profit: "50,000.00", margin: "18%", risk: false },
    { project: "NHIA Audit", budget: "200,000.00", actual: "150,000.00", spent: "140,000.00", profit: "10,000.00", margin: "20%", risk: false },
  ];

  return (
    <div className="expense-table-container">
      <div className="table-header">
        <h3>{title}</h3>
        <button className="table-filter"><FaFilter /> Filter ▾</button>
      </div>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Budget</th>
            <th>Actual</th>
            <th>Spent</th>
            <th>Profit</th>
            <th>Margin</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={row.risk ? 'risk-row' : ''}>
              <td>
                {row.risk && <FaExclamationTriangle className="risk-icon" title="Project at risk" />}
                {row.project}
              </td>
              <td>{row.budget}</td>
              <td>{row.actual}</td>
              <td>{row.spent}</td>
              <td className={parseInt(row.profit.replace(/,/g, '')) < 0 ? 'text-danger' : ''}>
                {row.profit}
              </td>
              <td className={`margin-cell ${row.risk ? 'risk-text' : 'success-text'}`}>
                {row.margin}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
