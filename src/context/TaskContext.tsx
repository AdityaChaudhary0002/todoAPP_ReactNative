import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext';
import { Task } from '../types';

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => Promise<void>;
  toggleTaskCompletion: (id: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  addTask: async () => {},
  toggleTaskCompletion: async () => {},
  deleteTask: async () => {},
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Tasks')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const fetchedTasks: Task[] = [];
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
            });
          }
          setTasks(fetchedTasks);
        },
        (error) => {
          console.error("Firestore Error:", error);
        }
      );

    return () => unsubscribe();
  }, [user]);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    if (!user) return;
    try {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Tasks')
        .add({
          ...taskData,
          completed: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (e) {
      console.error("Error adding task:", e);
    }
  };

  const toggleTaskCompletion = async (id: string, currentStatus: boolean) => {
    if (!user) return;
    try {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Tasks')
        .doc(id)
        .update({
          completed: !currentStatus,
        });
    } catch (e) {
      console.error("Error toggling task completion:", e);
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;
    try {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Tasks')
        .doc(id)
        .delete();
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
