"use client";

import { useEffect, useState } from "react";
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

export interface WorkoutPlan {
  id: string;
  name: string;
  createdAt: any;
}

export function useWorkoutPlans() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const workoutPlansQuery = query(
      collection(db, "routines"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(workoutPlansQuery, (snapshot) => {
      const workoutPlans = snapshot.docs.map(
        (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as WorkoutPlan)
      );
      setPlans(workoutPlans);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function addWorkoutPlan(name: string) {
    if (!name.trim()) return;
    await addDoc(collection(db, "routines"), {
      name,
      createdAt: serverTimestamp(),
    });
  }

  async function renameWorkoutPlan(planId: string, newName: string) {
    await updateDoc(doc(db, "routines", planId), { name: newName });
  }

  async function deleteWorkoutPlan(planId: string) {
    await deleteDoc(doc(db, "routines", planId));
  }

  return {
    plans,
    isLoading,
    addWorkoutPlan,
    renameWorkoutPlan,
    deleteWorkoutPlan,
  };
}
