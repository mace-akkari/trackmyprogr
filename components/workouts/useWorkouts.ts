"use client";

import { useEffect, useState } from "react";
import type { Workout } from "./types";
import {
  subscribeWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkoutById,
} from "@/lib/workoutService";

// each routine tab uses its own unique routineId, which then renders its workouts from firestore.
export function useWorkouts(routineId: string) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    if (!routineId) return;
    const unsubscribe = subscribeWorkouts(routineId, (nextWorkouts) => {
      setWorkouts(nextWorkouts);
    });
    return () => unsubscribe();
  }, [routineId]);

  async function saveWorkout(values: {
    name: string;
    sets: number;
    reps: number;
    weight: string;
    category?: string;
  }) {
    if (!routineId || !values.name.trim()) return;

    if (editingWorkout) {
      await updateWorkout(routineId, editingWorkout.id, values);
      setEditingWorkout(null);
    } else {
      await addWorkout(routineId, values);
    }
  }

  async function removeWorkout(workoutId: string) {
    if (!routineId) return;
    await deleteWorkoutById(routineId, workoutId);
  }

  function cancelEditing() {
    setEditingWorkout(null);
  }

  return {
    workouts,
    editingWorkout,
    setEditingWorkout,
    saveWorkout,
    removeWorkout,
    cancelEditing,
  };
}
