import React from "react";
import ThemeToggle from "@/components/custom/themeToggle";

export default function DashboardSettings() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Manage your preferences and switch the interface theme anytime.
      </p>
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold">Appearance</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Choose between light and dark mode for the full app experience.
          </p>
        </div>
        <ThemeToggle className="border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
      </div>
    </div>
  );
}
