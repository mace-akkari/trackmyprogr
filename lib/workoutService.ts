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

// utility: reference to workouts subcollection inside the given routine
function getWorkoutsCollectionRef(routineId: string) {
  return collection(db, "routines", routineId, "workouts");
}

export function subscribeWorkouts(
  routineId: string,
  callback: (workouts: Workout[]) => void
) {
  const queryRef = query(
    getWorkoutsCollectionRef(routineId),
    orderBy("createdAt", "desc")
  );
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

// add a new workout into the workouts subcollection for the given routine
export async function addWorkout(
  routineId: string,
  workoutData: Omit<Workout, "id" | "createdAt">
) {
  await addDoc(getWorkoutsCollectionRef(routineId), {
    ...workoutData,
    createdAt: serverTimestamp(),
  });
}

export async function updateWorkout(
  routineId: string,
  workoutId: string,
  partialUpdate: Partial<Omit<Workout, "id" | "createdAt">>
) {
  await updateDoc(
    doc(db, "routines", routineId, "workouts", workoutId),
    partialUpdate
  );
}

export async function deleteWorkoutById(routineId: string, workoutId: string) {
  await deleteDoc(doc(db, "routines", routineId, "workouts", workoutId));
}
