import { ETaskStatus, Task } from "@/types/Task";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "tasks-storage";

type TaskActions = {
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
};

interface TaskStore {
  tasks: Task[];
  actions: TaskActions;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      actions: {
        addTask: (title) => {
          const newTask: Task = {
            id: uuid(),
            status: ETaskStatus.Pending,
            created_at: new Date().toISOString(),
            title: title,
          };
          return set((state) => ({
            tasks: [...state.tasks, newTask],
          }));
        },
        removeTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
          })),
        completeTask: (id) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, status: ETaskStatus.Complete } : task
            ),
          })),
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
