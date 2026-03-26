interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export default function StatCard({ title, value, change, positive }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className="stat-meta">
          <div className={`stat-change ${positive ? 'positive' : ''}`}>{change}</div>
          <div className="stat-note">vs last year</div>
        </div>
      )}
    </div>
  );
}
