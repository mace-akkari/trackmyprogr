"use client";
import { Card } from "@/components/ui/card";
import { useWorkouts } from "@/components/workouts/useWorkouts";
import { WorkoutForm } from "@/components/workouts/WorkoutForm";
import { WorkoutList } from "@/components/workouts/WorkoutList";

export default function RoutineContent({ routineId }: { routineId: string }) {
  const {
    workouts,
    editingWorkout,
    setEditingWorkout,
    saveWorkout,
    removeWorkout,
    cancelEditing,
  } = useWorkouts(routineId);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <WorkoutForm
          onSubmit={saveWorkout}
          onCancel={cancelEditing}
          editingWorkout={editingWorkout}
        />
      </Card>
      <WorkoutList
        workouts={workouts}
        onEdit={setEditingWorkout}
        onDelete={removeWorkout}
      />
    </div>
  );
}
