'use client';

interface Stats {
  total: number;
  completed: number;
  active: number;
  high: number;
}

interface StatsBarProps {
  stats: Stats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const cards = [
    { label: 'Total Tasks', value: stats.total, icon: '\uD83D\uDCCB', color: '#4f46e5', bg: '#eff0fe' },
    { label: 'Completed', value: stats.completed, icon: '\u2705', color: '#16a34a', bg: '#dcfce7' },
    { label: 'Active', value: stats.active, icon: '\uD83D\uDD25', color: '#d97706', bg: '#fef3c7' },
    { label: 'High Priority', value: stats.high, icon: '\uD83D\uDD34', color: '#dc2626', bg: '#fee2e2' }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        {cards.map(card => (
          <div
            key={card.label}
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '22px' }}>{card.icon}</span>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '20px',
                background: card.bg,
                color: card.color
              }}>
                {card.value}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>{card.label}</p>
          </div>
        ))}
      </div>

      {stats.total > 0 && (
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Overall Progress</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>{progress}%</span>
          </div>
          <div style={{ background: 'var(--secondary)', borderRadius: '20px', height: '8px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                borderRadius: '20px',
                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                width: `${progress}%`,
                transition: 'width 0.5s ease-out'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
