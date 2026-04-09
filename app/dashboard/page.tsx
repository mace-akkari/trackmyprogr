import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { dashboardItems } from "@/components/dashboard/dashboardItems";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 text-center">
          {dashboardItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-white bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-xl border border-white bg-background p-3 text-primary transition-colors duration-200 group-hover:border-primary/30">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </Link>
            );
          })}
        </div>

        <div>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
