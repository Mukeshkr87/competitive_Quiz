import { Menu, X } from "lucide-react";
import Room from "./rooms/room";
import Quiz from "./quizzes/quiz";
import Question from "./questions/question";
import DashboardSettings from "./settings/settings";
import Sidebar from "./sidebar/sidebar";
import { useDashboard } from "../../context/dashboardContext";
import CreateQuestion from "./questions/createQuestion";
import CreateQuiz from "./quizzes/createQuiz";
import CreateRoom from "./rooms/createRoom";
import ThemeToggle from "@/components/custom/themeToggle";

export default function Dashboard() {
  const { activeTab, sidebarOpen, setSidebarOpen } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case "rooms":
        return <Room />;
      case "createRoom":
        return <CreateRoom />;
      case "quizzes":
        return <Quiz />;
      case "questions":
        return <Question />;
      case "createQuestion":
        return <CreateQuestion />;
      case "createQuiz":
        return <CreateQuiz />;
      case "settings":
        return <DashboardSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div
        className={`
       fixed inset-y-0 left-0 z-50 h-full w-72 bg-slate-950
      transform md:relative md:translate-x-0
      transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white/80 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 md:hidden">
          <h1 className="text-xl font-bold">QuizCraft-Ai</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-9 border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-md border border-slate-300 p-2 dark:border-slate-700"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="hidden items-center justify-between border-b border-slate-200 bg-white/80 px-8 py-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 md:flex">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Creator workspace
            </p>
            <h1 className="text-2xl font-black">QuizCraft-Ai Dashboard</h1>
          </div>
          <ThemeToggle className="border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </div>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-6xl">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
