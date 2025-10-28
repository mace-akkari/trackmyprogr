"use client";

import type { Workout } from "./types";
import { WorkoutCard } from "./WorkoutCard";
import { Card } from "@/components/ui/card";

type WorkoutListProps = {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (workoutId: string) => void;
};

export function WorkoutList({ workouts, onEdit, onDelete }: WorkoutListProps) {
  if (workouts.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        Add your first workout by entering the details above.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workoutItem) => (
        <WorkoutCard
          key={workoutItem.id}
          workout={workoutItem}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
