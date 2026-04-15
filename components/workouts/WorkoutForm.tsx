"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { Workout } from "./types";

type WorkoutFormValues = Omit<Workout, "id" | "createdAt">;

type WorkoutFormProps = {
  onSubmit: (values: WorkoutFormValues) => Promise<void>;
  onCancel: () => void;
  editingWorkout: (Workout & { category?: string; notes?: string }) | null;
};

const initialFormValues = {
  name: "",
  sets: "",
  reps: "",
  weight: "",
  category: "",
  notes: "",
};

export function WorkoutForm({
  onSubmit,
  onCancel,
  editingWorkout,
}: WorkoutFormProps) {
  const [formValues, setFormValues] = useState(initialFormValues);

  function resetForm() {
    setFormValues(initialFormValues);
  }

  useEffect(() => {
    if (editingWorkout) {
      setFormValues({
        name: editingWorkout.name,
        sets: editingWorkout.sets?.toString() ?? "",
        reps: editingWorkout.reps?.toString() ?? "",
        weight: editingWorkout.weight,
        category: editingWorkout.category ?? "",
        notes: editingWorkout.notes ?? "",
      });
    } else {
      resetForm();
    }
  }, [editingWorkout]);

  function handleInputChange(
    field: keyof typeof initialFormValues,
    value: string,
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = formValues.name.trim();
    const trimmedCategory = formValues.category.trim();
    const trimmedWeight = formValues.weight.trim();
    const trimmedNotes = formValues.notes.trim();

    if (!trimmedName) return;

    const values: {
      name: string;
      sets: number;
      reps: number;
      weight: string;
      category: string;
      notes?: string;
    } = {
      name: trimmedName,
      sets: Number(formValues.sets) || 0,
      reps: Number(formValues.reps) || 0,
      weight: trimmedWeight,
      category: trimmedCategory,
    };

    if (trimmedNotes) {
      values.notes = trimmedNotes;
    }

    await onSubmit(values);

    resetForm();
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
            value={formValues.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
            placeholder="Exercise Name"
            required
            className="focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <Input
            id="workout-category"
            type="text"
            value={formValues.category}
            onChange={(event) =>
              handleInputChange("category", event.target.value)
            }
            placeholder="Category (e.g. Chest / Back / Cardio)"
            required
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
              value={formValues.sets}
              onChange={(event) =>
                handleInputChange("sets", event.target.value)
              }
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
              value={formValues.reps}
              onChange={(event) =>
                handleInputChange("reps", event.target.value)
              }
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
              value={formValues.weight}
              onChange={(event) =>
                handleInputChange("weight", event.target.value)
              }
              placeholder="20 kg"
              className="focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="workout-notes"
            className="block text-sm font-medium mb-2"
          >
            Notes (optional)
          </label>
          <textarea
            id="workout-notes"
            value={formValues.notes}
            onChange={(event) => handleInputChange("notes", event.target.value)}
            placeholder="Any notes for next time?"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                       shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                       resize-y"
          />
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
