import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DisplayQuiz from "./displayQuiz";
import { useDashboard } from "@/context/dashboardContext";
import Cookies from "js-cookie";
import { toast } from "sonner";
import axios from "axios";
import { apiUrl } from "@/lib/api";

export default function Quiz() {
  const { setActiveTab, quizzes, setQuizzes } = useDashboard();

  const addQuiz = () => {
    setActiveTab("createQuiz");
  };

  const deleteQuiz = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.delete(`${apiUrl}/api/quiz/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes((q) => q.filter((q) => q._id !== id));
      toast.success("Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <Button
          onClick={addQuiz}
          size="lg"
          className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
        >
          <Plus size={18} />
          Create Quiz
        </Button>
      </div>

      <div>
        <DisplayQuiz quizzes={quizzes} deleteQuiz={deleteQuiz} />
      </div>
    </div>
  );
}
