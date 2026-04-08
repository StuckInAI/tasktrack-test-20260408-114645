'use client';

import { TaskFilter } from '../types/task';

interface FilterBarProps {
  filter: TaskFilter;
  onFilterChange: (f: TaskFilter) => void;
  counts: { all: number; active: number; completed: number };
}

const filters: { label: string; value: TaskFilter; emoji: string }[] = [
  { label: 'All', value: 'all', emoji: '\uD83D\uDCCB' },
  { label: 'Active', value: 'active', emoji: '\uD83D\uDD25' },
  { label: 'Completed', value: 'completed', emoji: '\u2705' },
  { label: 'High', value: 'high', emoji: '\uD83D\uDD34' },
  { label: 'Medium', value: 'medium', emoji: '\uD83D\uDFE1' },
  { label: 'Low', value: 'low', emoji: '\uD83D\uDFE2' }
];

export default function FilterBar({ filter, onFilterChange, counts }: FilterBarProps) {
  const getCount = (val: TaskFilter): number | null => {
    if (val === 'all') return counts.all;
    if (val === 'active') return counts.active;
    if (val === 'completed') return counts.completed;
    return null;
  };

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '12px',
      marginBottom: '20px',
      border: '1px solid var(--border)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    }}>
      {filters.map(f => {
        const count = getCount(f.value);
        const isActive = filter === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius)',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              background: isActive ? 'var(--primary)' : 'var(--secondary)',
              color: isActive ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#e2e8f0'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'var(--secondary)'; }}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
            {count !== null && (
              <span style={{
                background: isActive ? 'rgba(255,255,255,0.3)' : '#cbd5e1',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                borderRadius: '20px',
                padding: '1px 7px',
                fontSize: '11px',
                fontWeight: '700'
              }}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
