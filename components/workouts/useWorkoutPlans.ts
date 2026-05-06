"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";

export interface WorkoutPlan {
  id: string;
  name: string;
  ownerId: string;
  createdAt: any;
}

export function useWorkoutPlans() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      setPlans([]);
      setIsLoading(false);
      return;
    }

    const workoutPlansQuery = query(
      collection(db, "routines"),
      where("ownerId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(workoutPlansQuery, (snapshot) => {
      const workoutPlans = snapshot.docs.map(
        (docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as WorkoutPlan,
      );
      setPlans(workoutPlans);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  async function addWorkoutPlan(name: string) {
    if (!name.trim()) return;
    if (!user) return;
    await addDoc(collection(db, "routines"), {
      name,
      ownerId: user.uid,
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
