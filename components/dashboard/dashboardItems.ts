import { User, Apple, Dumbbell, ChartColumn } from "lucide-react";

export const dashboardItems = [
  {
    title: "Account",
    description: "Manage your profile.",
    href: "/account",
    icon: User,
  },
  {
    title: "Nutrition",
    description: "Track meals and calories.",
    href: "/nutrition",
    icon: Apple,
  },
  {
    title: "Workouts",
    description: "View routines or log exercises.",
    href: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Progress",
    description: "Monitor improvements across your training.",
    href: "/progress",
    icon: ChartColumn,
  },
] as const;
