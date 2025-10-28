"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Workout } from "./types";
import { Timestamp } from "firebase/firestore";
import { Pencil, Trash2 } from "lucide-react";

function formatDate(value?: Timestamp | null) {
  if (!value) return "Just now";
  try {
    return value.toDate().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Just now";
  }
}

type WorkoutCardProps = {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (workoutId: string) => void;
};

function Stat({
  label,
  value,
}: {
  label: string;
  value?: number | string | null;
}) {
  if (!value) return null;
  return (
    <span>
      <span className="font-medium">{label}:</span> {value}
    </span>
  );
}

export function WorkoutCard({ workout, onEdit, onDelete }: WorkoutCardProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{workout.name}</h3>
          <p className="text-sm text-muted-foreground">
            Added {formatDate(workout.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(workout)}
            aria-label="Edit workout"
            title="Edit workout"
            className="transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <span className="inline-flex items-center gap-1">
              <Pencil className="h-4 w-4" /> Edit
            </span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(workout.id)}
            aria-label="Delete workout"
            title="Delete workout"
            className="transition-transform duration-200 hover:scale-[1.02] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <span className="inline-flex items-center gap-1">
              <Trash2 className="h-4 w-4" /> Delete
            </span>
          </Button>
        </div>
      </div>

      <div className="flex gap-4 text-sm">
        <Stat label="Sets" value={workout.sets} />
        <Stat label="Reps" value={workout.reps} />
        <Stat label="Weight" value={workout.weight} />
      </div>
    </Card>
  );
}
