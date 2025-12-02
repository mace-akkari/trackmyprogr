"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkoutPlans } from "@/components/workouts/useWorkoutPlans";

export default function AddRoutineBar() {
  const { addWorkoutPlan } = useWorkoutPlans();
  const [name, setName] = useState("");

  return (
    <Card className="p-4 mb-6">
      <div className="flex gap-2">
        <Input
          placeholder="Routine Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter" && name.trim()) {
              await addWorkoutPlan(name.trim());
              setName("");
            }
          }}
        />
        <Button
          type="button"
          onClick={async () => {
            if (!name.trim()) return;
            await addWorkoutPlan(name.trim());
            setName("");
          }}
        >
          Add Routine
        </Button>
      </div>
    </Card>
  );
}
