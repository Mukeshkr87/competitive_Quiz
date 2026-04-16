import {
  Home,
  Users,
  ClipboardList,
  HelpCircle,
  Trophy,
  Settings,
} from "lucide-react";
import { useDashboard } from "@/context/dashboardContext";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const SidebarButton = ({ setActiveTab, activeTab, icon, title }) => {
  return (
    <button
      onClick={() => setActiveTab(title)}
      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition ${
        activeTab === title ? "bg-white text-indigo-600" : "hover:bg-indigo-500"
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
    <aside className="w-64 h-full bg-gradient-to-b from-indigo-600 to-purple-600 text-white flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold">QuizMaster</div>
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
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
          className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-500 transition"
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
