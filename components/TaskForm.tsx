'use client';

import { useState, useEffect } from 'react';
import { Task, TaskPriority } from '../types/task';

interface TaskFormProps {
  onSubmit: (data: { title: string; description: string; priority: TaskPriority; dueDate: string }) => void;
  onCancel: () => void;
  initialData?: Task;
  isEditing?: boolean;
}

export default function TaskForm({ onSubmit, onCancel, initialData, isEditing = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  const validate = () => {
    const errs: { title?: string; dueDate?: string } = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!dueDate) errs.dueDate = 'Due date is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), priority, dueDate });
  };

  const priorityColors: Record<TaskPriority, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: '28px',
      marginBottom: '24px',
      border: '1px solid var(--border)',
      animation: 'slideDown 0.2s ease-out'
    }}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>
        {isEditing ? '&#x270F;&#xFE0F; Edit Task' : '&#x2795; Create New Task'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: undefined })); }}
            placeholder="Enter task title..."
            style={{
              width: '100%',
              padding: '10px 14px',
              border: `1.5px solid ${errors.title ? 'var(--danger)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              fontSize: '15px',
              color: 'var(--text-primary)',
              background: '#fff',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.title ? 'var(--danger)' : 'var(--border)')}
          />
          {errors.title && <p style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>{errors.title}</p>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Add a description (optional)..."
            rows={3}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontSize: '15px',
              color: 'var(--text-primary)',
              background: '#fff',
              resize: 'vertical',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Priority
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['low', 'medium', 'high'] as TaskPriority[]).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: 'var(--radius)',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: `2px solid ${priority === p ? priorityColors[p] : 'var(--border)'}`,
                    background: priority === p ? priorityColors[p] : '#fff',
                    color: priority === p ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => { setDueDate(e.target.value); setErrors(prev => ({ ...prev, dueDate: undefined })); }}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: `1.5px solid ${errors.dueDate ? 'var(--danger)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                fontSize: '15px',
                color: 'var(--text-primary)',
                background: '#fff',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.dueDate ? 'var(--danger)' : 'var(--border)')}
            />
            {errors.dueDate && <p style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>{errors.dueDate}</p>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius)',
              fontSize: '14px',
              fontWeight: '600',
              border: '1.5px solid var(--border)',
              background: '#fff',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius)',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              background: 'var(--primary)',
              color: '#fff',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; }}
          >
            {isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
