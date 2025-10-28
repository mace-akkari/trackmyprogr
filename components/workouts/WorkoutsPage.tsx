"use client";

import { WorkoutForm } from "./WorkoutForm";
import { WorkoutList } from "./WorkoutList";
import { useWorkouts } from "./useWorkouts";

export default function WorkoutsPage() {
  const {
    workouts,
    editingWorkout,
    setEditingWorkout,
    saveWorkout,
    removeWorkout,
    cancelEditing,
  } = useWorkouts();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Workouts</h1>

        <WorkoutForm
          onSubmit={saveWorkout}
          onCancel={cancelEditing}
          editingWorkout={editingWorkout}
        />

        <WorkoutList
          workouts={workouts}
          onEdit={setEditingWorkout}
          onDelete={removeWorkout}
        />
      </div>
    </div>
  );
}
