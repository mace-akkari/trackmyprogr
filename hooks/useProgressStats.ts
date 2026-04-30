"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Workout } from "@/components/workouts/types";

type ProgressStats = {
  loggedExercises: number;
  totalSets: number;
  lastWorkoutDate: string;
  recentWorkouts: WorkoutWithRoutine[];
  isLoading: boolean;
};

type WorkoutWithRoutine = Workout & {
  routineName: string;
};

function formatWorkoutDate(workout: Workout) {
  if (!workout.createdAt) return "No data yet";

  return workout.createdAt.toDate().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calculateProgressStats(workouts: WorkoutWithRoutine[]): ProgressStats {
  const sortedWorkouts = workouts
    .filter((workout) => workout.createdAt)
    .sort(
      (firstWorkout, secondWorkout) =>
        secondWorkout.createdAt.toMillis() - firstWorkout.createdAt.toMillis(),
    );

  const latestWorkout = sortedWorkouts[0];

  const totalSets = workouts.reduce(
    (total, workout) => total + (Number(workout.sets) || 0),
    0,
  );

  return {
    loggedExercises: workouts.length,
    totalSets,
    lastWorkoutDate: latestWorkout
      ? formatWorkoutDate(latestWorkout)
      : "No data yet",
    recentWorkouts: sortedWorkouts.slice(0, 5),
    isLoading: false,
  };
}

export function useProgressStats(): ProgressStats {
  const [stats, setStats] = useState<ProgressStats>({
    loggedExercises: 0,
    totalSets: 0,
    lastWorkoutDate: "No data yet",
    recentWorkouts: [],
    isLoading: true,
  });

  useEffect(() => {
    const routinesCollectionRef = collection(db, "routines");
    let workoutUnsubscribes: (() => void)[] = [];

    const routinesUnsubscribe = onSnapshot(
      routinesCollectionRef,
      (routinesSnapshot) => {
        workoutUnsubscribes.forEach((unsubscribe) => unsubscribe());
        workoutUnsubscribes = [];

        const workoutsByRoutine: Record<string, WorkoutWithRoutine[]> = {};

        if (routinesSnapshot.empty) {
          setStats({
            loggedExercises: 0,
            totalSets: 0,
            lastWorkoutDate: "No data yet",
            recentWorkouts: [],
            isLoading: false,
          });
          return;
        }

        routinesSnapshot.docs.forEach((routineDocument) => {
          const routineWorkoutsRef = collection(
            db,
            "routines",
            routineDocument.id,
            "workouts",
          );

          const workoutUnsubscribe = onSnapshot(
            routineWorkoutsRef,
            (workoutsSnapshot) => {
              const routineName = routineDocument.data().name as string;

              workoutsByRoutine[routineDocument.id] = workoutsSnapshot.docs.map(
                (docSnapshot) => {
                  const workoutData = docSnapshot.data() as Omit<Workout, "id">;

                  return {
                    id: docSnapshot.id,
                    ...workoutData,
                    routineName,
                  };
                },
              );

              const workouts = Object.values(workoutsByRoutine).flat();
              setStats(calculateProgressStats(workouts));
            },
          );

          workoutUnsubscribes.push(workoutUnsubscribe);
        });
      },
    );

    return () => {
      routinesUnsubscribe();
      workoutUnsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return stats;
}
