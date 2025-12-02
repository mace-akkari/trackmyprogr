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
        No workouts yet. Add your first one using the form above.
      </Card>
    );
  }

  const groupedWorkouts = workouts.reduce<{
    [key: string]: { displayCategory: string; workouts: Workout[] };
  }>((groups, workoutItem) => {
    const categoryKey = workoutItem.category?.toLowerCase() || "uncategorised";
    if (!groups[categoryKey]) {
      groups[categoryKey] = {
        displayCategory: workoutItem.category
          ? workoutItem.category.charAt(0).toUpperCase() +
            workoutItem.category.slice(1).toLowerCase()
          : "Uncategorised",
        workouts: [],
      };
    }
    groups[categoryKey].workouts.push(workoutItem);
    return groups;
  }, {});

  return (
    <div className="space-y-8">
      {Object.values(groupedWorkouts).map(
        ({ displayCategory, workouts }, index, array) => (
          <div key={displayCategory}>
            <h3 className="text-xl font-bold mb-3 text-primary">
              {displayCategory}
            </h3>
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

            {index < array.length - 1 && (
              <hr className="border-t border-muted/30 my-4" />
            )}
          </div>
        )
      )}
    </div>
  );
}
