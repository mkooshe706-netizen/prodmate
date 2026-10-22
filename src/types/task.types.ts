export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  
  // Timing
  createdAt: string; // ISO String
  dueDate?: string;  // ISO String
  
  // 🤖 AI Productivity Fields
  estimatedMinutes?: number;    // AI estimates how long this takes
  isAIGenerated?: boolean;      // Flags if the AI created this task
  aiSuggestedTime?: string;     // AI suggestion (e.g., "Deep Work block at 10 AM")
  subtasks?: SubTask[];         // AI can automatically break down large tasks
  tags?: string[];
}

export interface ScheduleBlock {
  id: string;
  taskId?: string; // Optional: Link a block directly to a task
  title: string;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  type: 'focus' | 'meeting' | 'break' | 'routine';
  isAILocked: boolean; // If true, the AI won't auto-reschedule this block
}