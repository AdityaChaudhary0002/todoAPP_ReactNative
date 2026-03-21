export interface User {
  uid: string;
  email: string | null;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dateTime?: string; // e.g., "2024-03-25 10:00 AM"
  deadline?: number; // timestamp for sorting
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  createdAt: number;
}
