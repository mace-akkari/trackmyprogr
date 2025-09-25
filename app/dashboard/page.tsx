import { LogoutButton } from "@/components/auth/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <LogoutButton />
    </main>
  );
}
