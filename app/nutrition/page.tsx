import { Apple } from "lucide-react";

export default function NutritionPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-2xl border border-white bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 inline-flex rounded-xl border border-white bg-background p-4 text-primary">
            <Apple className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">Nutrition Tracker</h1>
          <p className="mt-3 text-lg font-medium text-primary">Coming Soon</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground md:text-base">
            Track calories, protein, meals, and daily nutrition insights in a
            future update.
          </p>
        </div>
      </div>
    </main>
  );
}
