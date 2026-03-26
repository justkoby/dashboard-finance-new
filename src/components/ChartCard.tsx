interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}

export default function ChartCard({ title, children, wide }: ChartCardProps) {
  return (
    <div className={`chart-card${wide ? ' wide' : ''}`}>
      <div className="chart-title">{title}</div>
      <div className="chart-placeholder">{children}</div>
    </div>
  );
}
