'use client';

import { Task, TaskFilter } from '../types/task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  filter: TaskFilter;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit, filter }: TaskListProps) {
  if (tasks.length === 0) {
    const messages: Record<TaskFilter, { icon: string; text: string }> = {
      all: { icon: '\uD83D\uDCCB', text: 'No tasks yet. Create your first task!' },
      active: { icon: '\uD83C\uDF89', text: 'No active tasks. All done!' },
      completed: { icon: '\uD83D\uDCDD', text: 'No completed tasks yet.' },
      high: { icon: '\u2705', text: 'No high priority tasks pending.' },
      medium: { icon: '\u2705', text: 'No medium priority tasks pending.' },
      low: { icon: '\u2705', text: 'No low priority tasks pending.' }
    };
    const msg = messages[filter];
    return (
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-lg)',
        padding: '60px 20px',
        textAlign: 'center',
        border: '2px dashed var(--border)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{msg.icon}</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{msg.text}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
