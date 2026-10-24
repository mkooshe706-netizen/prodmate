import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskStatus } from '../types/task.types';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  addTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addAIGeneratedTasks: (
    tasksData: Omit<Task, 'id' | 'createdAt' | 'isAIGenerated'>[]
  ) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      isLoading: false,

      addTask: (taskData) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...taskData,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleTaskCompletion: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              const newStatus: TaskStatus =
                task.status === 'completed' ? 'todo' : 'completed';
              return { ...task, status: newStatus };
            }
            return task;
          }),
        })),

      addAIGeneratedTasks: (tasksData) =>
        set((state) => {
          const newTasks: Task[] = tasksData.map((data) => ({
            ...data,
            id: generateId(),
            createdAt: new Date().toISOString(),
            isAIGenerated: true,
          }));
          return { tasks: [...state.tasks, ...newTasks] };
        }),

      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'completed'),
        })),
    }),
    {
      name: 'prodmate-tasks',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);