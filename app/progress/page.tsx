"use client";

import { Activity, Dumbbell, CalendarDays } from "lucide-react";
import { useProgressStats } from "@/hooks/useProgressStats";

function getProgressStats(
  loggedExercises: number,
  totalSets: number,
  lastWorkoutDate: string,
) {
  return [
    {
      title: "Total Exercises",
      value: loggedExercises.toString(),
      description: "Exercises logged across all routines",
      icon: Dumbbell,
    },
    {
      title: "Total Sets",
      value: totalSets.toString(),
      description: "Sets completed across all routines",
      icon: Activity,
    },
    {
      title: "Last Activity",
      value: lastWorkoutDate,
      description: "Most recent workout across all routines",
      icon: CalendarDays,
    },
  ] as const;
}

export default function ProgressPage() {
  const { loggedExercises, totalSets, lastWorkoutDate, isLoading } =
    useProgressStats();

  const progressStats = getProgressStats(
    loggedExercises,
    totalSets,
    lastWorkoutDate,
  );

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold md:text-4xl">Progress</h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            View your training activity and track your consistency over time.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {progressStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/80 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-xl border border-white bg-background p-3 text-primary transition-colors duration-200 group-hover:border-primary/30">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </h2>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-white bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/80 hover:shadow-lg">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your recent workout sessions will appear here when you start logging
            them.
          </p>
        </div>
      </div>
    </main>
  );
}
