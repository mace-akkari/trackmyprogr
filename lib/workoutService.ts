import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import type { Workout } from "@/components/workouts/types";

const workoutsCollectionRef = collection(db, "workouts");

export function subscribeWorkouts(callback: (workouts: Workout[]) => void) {
  const queryRef = query(workoutsCollectionRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    queryRef,
    (snapshot) => {
      const workouts = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      })) as Workout[];
      callback(workouts);
    },
    (error) => {
      console.error("subscribeWorkouts error:", error);
    }
  );
}

export async function addWorkout(
  workoutData: Omit<Workout, "id" | "createdAt">
) {
  await addDoc(workoutsCollectionRef, {
    ...workoutData,
    createdAt: serverTimestamp(),
  });
}

export async function updateWorkout(
  workoutId: string,
  partialUpdate: Partial<Omit<Workout, "id" | "createdAt">>
) {
  await updateDoc(doc(db, "workouts", workoutId), partialUpdate);
}

export async function deleteWorkoutById(workoutId: string) {
  await deleteDoc(doc(db, "workouts", workoutId));
}
