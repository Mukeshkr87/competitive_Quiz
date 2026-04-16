import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DisplayQuiz from "./displayQuiz";
import { useDashboard } from "@/context/dashboardContext";
import Cookies from "js-cookie";
import { toast } from "sonner";
import axios from "axios";

export default function Quiz() {
  const { setActiveTab, quizzes, setQuizzes } = useDashboard();
  // eslint-disable-next-line no-unused-vars
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <Button
          onClick={addQuiz}
          size="lg"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
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
