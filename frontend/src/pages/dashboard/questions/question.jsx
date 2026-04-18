// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useDashboard } from "@/context/dashboardContext";
import DisplayQuestion from "./displayQuestion";
import { Button } from "@/components/ui/button";
import axios from "axios";

import Cookies from "js-cookie";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";

export default function Question() {
  const { setActiveTab, questions, setQuestions } = useDashboard();

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
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Questions</h2>
        <Button
          onClick={addQuestion}
          size="lg"
          className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
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
