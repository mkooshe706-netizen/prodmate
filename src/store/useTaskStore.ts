import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task.types';

// Helper to generate a quick unique ID (in a real app, use 'uuid' or backend IDs)
const generateId = () => Math.random().toString(36).substring(2, 9);

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  
  // Standard Actions
  addTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  
  // 🤖 AI-Specific Actions
  addAIGeneratedTasks: (tasksData: Omit<Task, 'id' | 'createdAt' | 'isAIGenerated'>[]) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  // We'll start with some dummy data so the UI looks great immediately
  tasks: [
    {
      id: '1',
      title: 'Review Q3 Marketing Strategy',
      description: 'Analyze the recent ad spend and prepare a summary.',
      status: 'todo',
      priority: 'high',
      createdAt: new Date().toISOString(),
      estimatedMinutes: 45,
      tags: ['Work', 'Marketing'],
    },
    {
      id: '2',
      title: 'Brainstorm App Features',
      status: 'completed',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      isAIGenerated: true,
      estimatedMinutes: 30,
      tags: ['Creative'],
    }
  ],
  isLoading: false,

  addTask: (taskData) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        ...taskData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      }
    ]
  })),

  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    )
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),

  toggleTaskCompletion: (id) => set((state) => ({
    tasks: state.tasks.map(task => {
      if (task.id === id) {
        const newStatus: TaskStatus = task.status === 'completed' ? 'todo' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    })
  })),

  // AI Assistant can inject an array of tasks (e.g., after parsing a voice note)
  addAIGeneratedTasks: (tasksData) => set((state) => {
    const newTasks: Task[] = tasksData.map(data => ({
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      isAIGenerated: true, // Force this flag so the UI can highlight them
    }));
    
    return { tasks: [...state.tasks, ...newTasks] };
  }),

  clearCompleted: () => set((state) => ({
    tasks: state.tasks.filter(task => task.status !== 'completed')
  }))
}));