import { useDashboard } from "@/context/dashboardContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuestionAddComponent from "./questionAddComponent";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";

export default function CreateQuiz() {
  const { questions, setActiveTab, setQuizzes } = useDashboard();
  const [title, setTitle] = useState("");

  const [questionList, setQuestionList] = useState([]);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const addQuestion = (q) => {
    setQuestionList((prev) => {
      if (prev.some((question) => question.id === q._id)) {
        return prev;
      }

      return [
        ...prev,
        {
          title: q.title,
          id: q._id,
        },
      ];
    });
  };

  const removeQuestion = (q) => {
    setQuestionList((list) => list.filter((question) => question.id != q.id));
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const idsOfQuestions = questionList.map((q) => q.id);

    if (questionList.length === 0) return alert("Add some questions");
    if (title.length === 0) return alert("add title");

    try {
      const payload = {
        title,
        questions: idsOfQuestions,
      };

      const response = await axios.post(`${apiUrl}/api/quiz/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      toast.success("Created");
      setQuizzes((quizzes) => [...quizzes, response.data.quiz]);
      setActiveTab("quizzes");
    } catch (error) {
      toast.error("Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-center text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
          Create Quiz
        </h1>

        <Input
          value={title}
          onChange={onChange}
          id="title"
          type="text"
          placeholder="Enter quiz title..."
          className="rounded-lg border-gray-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Questions */}

          <QuestionAddComponent
            className="bg-indigo-600 text-white hover:text-white hover:bg-indigo-700"
            heading="Available Questions"
            list={questions}
            purpose="Add"
            task={addQuestion}
          />

          {/* Selected Questions */}

          {questionList.length === 0 ? (
            <div className="text-center text-slate-600 dark:text-slate-400">
              No questions added
            </div>
          ) : (
            <>
              <QuestionAddComponent
                className="text-white"
                purpose="Remove"
                list={questionList}
                heading="Selected Questions"
                variant="destructive"
                task={removeQuestion}
              />
            </>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-lg border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setActiveTab("quizzes")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={handleCreateQuiz}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
