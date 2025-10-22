import { Timestamp } from "firebase/firestore";

export interface Workout {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Timestamp;
}
