'use client';

import { useState } from 'react';
import { Task, TaskPriority } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityConfig: Record<TaskPriority, { color: string; bg: string; label: string }> = {
  low: { color: '#16a34a', bg: '#dcfce7', label: 'Low' },
  medium: { color: '#d97706', bg: '#fef3c7', label: 'Medium' },
  high: { color: '#dc2626', bg: '#fee2e2', label: 'High' }
};

export default function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const priority = priorityConfig[task.priority];
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = !task.completed && task.dueDate < today;
  const isDueToday = !task.completed && task.dueDate === today;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setConfirmDelete(false); }}
      style={{
        background: task.completed ? '#f8fafc' : 'var(--card-bg)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        border: `1.5px solid ${hovered && !task.completed ? 'var(--primary)' : 'var(--border)'}`,
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow)',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        opacity: task.completed ? 0.75 : 1
      }}
    >
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          border: `2px solid ${task.completed ? 'var(--success)' : 'var(--border)'}`,
          background: task.completed ? 'var(--success)' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px',
          transition: 'all 0.2s'
        }}
      >
        {task.completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
            textDecoration: task.completed ? 'line-through' : 'none'
          }}>
            {task.title}
          </h3>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '20px',
            background: priority.bg,
            color: priority.color,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {priority.label}
          </span>
        </div>

        {task.description && (
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.5' }}>
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '12px',
            fontWeight: '500',
            color: isOverdue ? 'var(--danger)' : isDueToday ? '#d97706' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {isOverdue ? '\u26A0\uFE0F' : isDueToday ? '\u23F0' : '\uD83D\uDCC5'}
            {isOverdue ? 'Overdue \u00B7 ' : isDueToday ? 'Due Today \u00B7 ' : ''}
            {formatDate(task.dueDate)}
          </span>
          {task.completed && (
            <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '500' }}>\u2713 Completed</span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexShrink: 0, alignItems: 'center' }}>
        {!task.completed && (
          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: '#fff',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            &#x270F;&#xFE0F;
          </button>
        )}
        {confirmDelete ? (
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius)',
                border: 'none',
                background: 'var(--danger)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: '#fff',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            title="Delete task"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: '#fff',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff5f5'; e.currentTarget.style.borderColor = 'var(--danger)'; e.currentTarget.style.color = 'var(--danger)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            &#x1F5D1;&#xFE0F;
          </button>
        )}
      </div>
    </div>
  );
}
