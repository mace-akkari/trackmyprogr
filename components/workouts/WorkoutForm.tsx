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
    category?: string;
  }) => Promise<void>;
  onCancel: () => void;
  editingWorkout: (Workout & { category?: string }) | null;
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
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingWorkout) {
      setName(editingWorkout.name);
      setSets(editingWorkout.sets?.toString() ?? "");
      setReps(editingWorkout.reps?.toString() ?? "");
      setWeight(editingWorkout.weight);
      setCategory(editingWorkout.category ?? "");
    } else {
      setName("");
      setSets("");
      setReps("");
      setWeight("");
      setCategory("");
    }
  }, [editingWorkout]);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCategory(event.target.value);
  }

  function handleSetsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSets(event.target.value);
  }

  function handleRepsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setReps(event.target.value);
  }

  function handleWeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWeight(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const trimmedWeight = weight.trim();

    if (!trimmedName) return;

    await onSubmit({
      name: trimmedName,
      sets: Number(sets) || 0,
      reps: Number(reps) || 0,
      weight: trimmedWeight,
      category: trimmedCategory || undefined,
    });
    setName("");
    setCategory("");
    setSets("");
    setReps("");
    setWeight("");
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editingWorkout ? "Edit Exercise" : "Add Exercise"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            id="exercise-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Exercise Name"
            required
            className="focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <Input
            id="workout-category"
            type="text"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Category (e.g. Chest / Cardio)"
            className="focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
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
              onChange={handleSetsChange}
              placeholder="4"
              className="focus:ring-2 focus:ring-primary"
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
              onChange={handleRepsChange}
              placeholder="10"
              className="focus:ring-2 focus:ring-primary"
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
              onChange={handleWeightChange}
              placeholder="20 kg"
              className="focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
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
