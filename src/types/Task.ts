export interface Task {
  id: string;
  title: string;
  status: keyof typeof ETaskStatus;
  created_at: string;
}

export enum ETaskStatus {
  Pending = "Pending",
  Complete = "Complete",
}
