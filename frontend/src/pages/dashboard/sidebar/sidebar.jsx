import { Users, ClipboardList, HelpCircle, Settings } from "lucide-react";
import { useDashboard } from "@/context/dashboardContext";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import ThemeToggle from "@/components/custom/themeToggle";

const SidebarButton = ({ setActiveTab, activeTab, icon, title }) => {
  return (
    <button
      onClick={() => setActiveTab(title)}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
        activeTab === title
          ? "bg-sky-400 text-slate-950 shadow-lg"
          : "text-slate-300 hover:bg-white/8 hover:text-white"
      }`}
    >
      {icon} {title.charAt(0).toUpperCase() + title.slice(1)}
    </button>
  );
};

export default function Sidebar() {
  const { activeTab, setActiveTab } = useDashboard();

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    Cookies.remove("token");
  };

  return (
    <aside className="flex h-full w-72 flex-col justify-between bg-slate-950 text-white">
      <div>
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Live quiz builder
          </p>
          <div className="mt-2 text-2xl font-black tracking-tight">
            QuizCraft-Ai
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Create, host, and manage multiplayer sessions.
          </p>
          <ThemeToggle className="mt-4 w-full justify-center border-white/10 bg-white/5 text-slate-100 hover:bg-white/10" />
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 px-4 py-6">
            <li>
              <SidebarButton
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={<Users size={18} />}
                title={"rooms"}
              />
            </li>
            <li>
              <SidebarButton
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={<ClipboardList size={18} />}
                title={"quizzes"}
              />
            </li>
            <li>
              <SidebarButton
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={<HelpCircle size={18} />}
                title={"questions"}
              />
            </li>
            <li>
              <SidebarButton
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={<Settings size={18} />}
                title={"settings"}
              />
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-slate-300 transition hover:bg-white/8 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
