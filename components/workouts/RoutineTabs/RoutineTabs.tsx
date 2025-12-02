"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWorkoutPlans } from "@/components/workouts/useWorkoutPlans";
import AddRoutineBar from "./AddRoutineBar";
import RoutineContent from "./RoutineContent";
import TabCloseButton from "./TabCloseButton";

export default function RoutineTabs() {
  const { plans, isLoading, deleteWorkoutPlan } = useWorkoutPlans();
  const firstRoutineId = useMemo(() => plans[0]?.id, [plans]);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (firstRoutineId) {
      setActiveId(firstRoutineId);
    }
  }, [firstRoutineId]);

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
  }

  if (plans.length === 0) {
    return (
      <>
        <AddRoutineBar />
        <div className="p-6 text-sm text-muted-foreground">
          No routines yet. Create your first one above.
        </div>
      </>
    );
  }

  return (
    <div className="w-full">
      <AddRoutineBar />

      <Tabs
        value={activeId ?? firstRoutineId}
        onValueChange={setActiveId}
        className="w-full"
      >
        <TabsList className="!flex w-full h-auto flex-wrap items-center gap-2 mb-12 bg-transparent p-0 shadow-none border-0">
          {plans.map((routine) => (
            <div
              key={routine.id}
              className="relative inline-flex items-center mr-2 mb-2"
            >
              <TabsTrigger
                value={routine.id}
                className="relative bg-transparent px-6 pr-8 py-3 text-lg font-bold rounded-lg border shadow-sm
                           data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                           hover:bg-primary/80 hover:text-primary-foreground transition-colors"
              >
                {routine.name}
              </TabsTrigger>

              <TabCloseButton
                onClick={async () => {
                  const shouldDelete = window.confirm(
                    `Delete routine "${routine.name}"?`
                  );
                  if (!shouldDelete) return;

                  const remainingRoutines = plans.filter(
                    (plan) => plan.id !== routine.id
                  );
                  const nextRoutineId = remainingRoutines[0]?.id;

                  await deleteWorkoutPlan(routine.id);

                  const isDeletingActiveRoutine = activeId === routine.id;

                  if (isDeletingActiveRoutine) {
                    setActiveId(nextRoutineId || undefined);
                  }
                }}
              />
            </div>
          ))}
        </TabsList>
      </Tabs>

      {activeId ? <RoutineContent routineId={activeId} /> : null}
    </div>
  );
}
