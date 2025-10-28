"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { Workout } from "./types";

type WorkoutFormProps = {
  onSubmit: (values: {
    name: string;
    sets: number;
    reps: number;
    weight: string;
  }) => Promise<void>;
  onCancel: () => void;
  editingWorkout: Workout | null;
};

export function WorkoutForm({
  onSubmit,
  onCancel,
  editingWorkout,
}: WorkoutFormProps) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (editingWorkout) {
      setName(editingWorkout.name);
      setSets(editingWorkout.sets?.toString() ?? "");
      setReps(editingWorkout.reps?.toString() ?? "");
      setWeight(editingWorkout.weight);
    } else {
      setName("");
      setSets("");
      setReps("");
      setWeight("");
    }
  }, [editingWorkout]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;

    await onSubmit({
      name,
      sets: Number(sets || 0),
      reps: Number(reps || 0),
      weight,
    });

    setName("");
    setSets("");
    setReps("");
    setWeight("");
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editingWorkout ? "Edit Workout" : "Add Workout"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="workout-name"
            className="block text-sm font-medium mb-2"
          >
            Workout Name
          </label>
          <Input
            id="workout-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Bench Press"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="workout-sets"
              className="block text-sm font-medium mb-2"
            >
              Sets
            </label>
            <Input
              id="workout-sets"
              type="number"
              inputMode="numeric"
              step="1"
              min="1"
              value={sets}
              onChange={(event) => setSets(event.target.value)}
              placeholder="4"
            />
          </div>

          <div>
            <label
              htmlFor="workout-reps"
              className="block text-sm font-medium mb-2"
            >
              Reps
            </label>
            <Input
              id="workout-reps"
              type="number"
              inputMode="numeric"
              step="1"
              min="1"
              value={reps}
              onChange={(event) => setReps(event.target.value)}
              placeholder="10"
            />
          </div>

          <div>
            <label
              htmlFor="workout-weight"
              className="block text-sm font-medium mb-2"
            >
              Weight
            </label>
            <Input
              id="workout-weight"
              type="text"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder="20 kg"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            {editingWorkout ? "Update" : "Add"} Workout
          </Button>
          {editingWorkout && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
