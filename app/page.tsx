'use client';

import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import StatsBar from '../components/StatsBar';
import { Task, TaskFilter, TaskPriority } from '../types/task';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Task[];
        setTasks(parsed);
      } catch {
        setTasks([]);
      }
    } else {
      const defaults: Task[] = [
        {
          id: '1',
          title: 'Review project requirements',
          description: 'Go through the project specs and identify key deliverables',
          priority: 'high',
          completed: false,
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
        },
        {
          id: '2',
          title: 'Set up development environment',
          description: 'Install necessary tools and configure workspace',
          priority: 'medium',
          completed: true,
          createdAt: new Date().toISOString(),
          dueDate: new Date().toISOString().split('T')[0]
        },
        {
          id: '3',
          title: 'Write unit tests',
          description: 'Cover core functionality with tests',
          priority: 'low',
          completed: false,
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0]
        }
      ];
      setTasks(defaults);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const handleAddTask = (data: { title: string; description: string; priority: TaskPriority; dueDate: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: data.dueDate
    };
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleUpdateTask = (data: { title: string; description: string; priority: TaskPriority; dueDate: string }) => {
    if (!editingTask) return;
    setTasks(prev =>
      prev.map(t =>
        t.id === editingTask.id
          ? { ...t, title: data.title, description: data.description, priority: data.priority, dueDate: data.dueDate }
          : t
      )
    );
    setEditingTask(null);
    setShowForm(false);
  };

  const handleToggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'high') return task.priority === 'high' && !task.completed;
    if (filter === 'medium') return task.priority === 'medium' && !task.completed;
    if (filter === 'low') return task.priority === 'low' && !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'high' && !t.completed).length
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <header style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: '#fff',
        padding: '0',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>&#x2705; Task Manager</h1>
              <p style={{ fontSize: '14px', opacity: 0.85, marginTop: '4px' }}>Stay organized and get things done</p>
            </div>
            <button
              onClick={() => { setEditingTask(null); setShowForm(true); }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: 'var(--radius)',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            >
              <span style={{ fontSize: '18px' }}>+</span> New Task
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '24px 20px' }}>
        <StatsBar stats={stats} />

        {showForm && (
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={handleCancelForm}
            initialData={editingTask || undefined}
            isEditing={!!editingTask}
          />
        )}

        <FilterBar filter={filter} onFilterChange={setFilter} counts={{ all: tasks.length, active: stats.active, completed: stats.completed }} />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          filter={filter}
        />
      </main>
    </div>
  );
}
