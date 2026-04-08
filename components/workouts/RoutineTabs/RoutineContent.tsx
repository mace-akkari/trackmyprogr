"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { useWorkouts } from "@/components/workouts/useWorkouts";
import { WorkoutForm } from "@/components/workouts/WorkoutForm";
import { WorkoutList } from "@/components/workouts/WorkoutList";
import type { Workout } from "@/components/workouts/types";

export default function RoutineContent({ routineId }: { routineId: string }) {
  const {
    workouts,
    editingWorkout,
    setEditingWorkout,
    saveWorkout,
    removeWorkout,
    cancelEditing,
  } = useWorkouts(routineId);

  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const [pendingScrollWorkoutId, setPendingScrollWorkoutId] = useState<
    string | null
  >(null);

  function handleEditWorkout(workout: Workout) {
    setEditingWorkout(workout);
    formContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    if (!pendingScrollWorkoutId) return;

    const workoutCardElement = document.getElementById(
      `workout-${pendingScrollWorkoutId}`,
    );

    if (!workoutCardElement) return;

    workoutCardElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setPendingScrollWorkoutId(null);
  }, [workouts, pendingScrollWorkoutId]);

  async function handleSubmit(values: Parameters<typeof saveWorkout>[0]) {
    const editedWorkoutId = editingWorkout?.id;

    await saveWorkout(values);

    if (!editedWorkoutId) return;

    setPendingScrollWorkoutId(editedWorkoutId);
  }

  return (
    <div className="space-y-6">
      <div ref={formContainerRef}>
        <Card className="p-6">
          <WorkoutForm
            onSubmit={handleSubmit}
            onCancel={cancelEditing}
            editingWorkout={editingWorkout}
          />
        </Card>
      </div>
      <WorkoutList
        workouts={workouts}
        onEdit={handleEditWorkout}
        onDelete={removeWorkout}
      />
    </div>
  );
}
