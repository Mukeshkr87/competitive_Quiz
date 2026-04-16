// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useDashboard } from "@/context/dashboardContext";
import DisplayQuestion from "./displayQuestion";
import { Button } from "@/components/ui/button";
import axios from "axios";

import Cookies from "js-cookie";
import { toast } from "sonner";

export default function Question() {
  const { setActiveTab, questions, setQuestions } = useDashboard();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const addQuestion = () => {
    setActiveTab("createQuestion");
  };

  const deleteQuestion = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.delete(`${apiUrl}/api/question/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions((q) => q.filter((q) => q._id !== id));
      toast.success("Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Questions</h2>
        <Button
          onClick={addQuestion}
          size="lg"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Create Question
        </Button>
      </div>

      <div>
        <DisplayQuestion
          questions={questions}
          deleteQuestion={deleteQuestion}
        />
      </div>
    </div>
  );
}
