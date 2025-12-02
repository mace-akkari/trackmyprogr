"use client";
import RoutineTabs from "@/components/workouts/RoutineTabs/RoutineTabs";

export default function WorkoutsPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">My Workouts</h1>
        <RoutineTabs />
      </div>
    </div>
  );
}
