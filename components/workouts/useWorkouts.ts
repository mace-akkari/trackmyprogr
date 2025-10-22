"use client";

import { useEffect, useState } from "react";
import type { Workout } from "./types";
import {
  subscribeWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkoutById,
} from "@/lib/workoutService";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeWorkouts((nextWorkouts) => {
      setWorkouts(nextWorkouts);
    });
    return () => unsubscribe();
  }, []);

  async function saveWorkout(workoutValues: {
    name: string;
    sets: number;
    reps: number;
    weight: string;
  }) {
    if (!workoutValues.name.trim()) return;
    if (editingWorkout) {
      await updateWorkout(editingWorkout.id, workoutValues);
      setEditingWorkout(null);
    } else {
      await addWorkout(workoutValues);
    }
  }

  async function removeWorkout(workoutId: string) {
    await deleteWorkoutById(workoutId);
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
