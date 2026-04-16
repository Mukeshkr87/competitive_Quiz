import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDashboard } from "../../../context/dashboardContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot, Sparkles } from "lucide-react";
import Chatbox from "@/components/custom/chatbox";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useState } from "react";

export default function CreateQuestion() {
  const { register, handleSubmit, control, reset } = useForm();
  const { setActiveTab, setQuestions } = useDashboard();
  const [mode, setMode] = useState("manual"); // "manual" or "generate"
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [generating, setGenerating] = useState(false);
  const options = [1, 2, 3];

  const onSubmit = async (data) => {
    const token = Cookies.get("token");
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      let options = [data.option1, data.option2, data.option3];
      const payload = {
        title: data.title,
        options,
        ansIndex: data.ansIndex,
      };

      const response = await axios.post(`${apiUrl}/api/question/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActiveTab("questions");
      setQuestions((q) => [...q, response.data.question]);
      toast.success("Created");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  const generateQuestionsFromTopic = async () => {
    if (!topic.trim() || !context.trim()) {
      toast.error("Please provide both topic and context");
      return;
    }

    const token = Cookies.get("token");
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    
    setGenerating(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/talkToAI/generateQuestions`,
        {
          topic: topic.trim(),
          context: context.trim(),
          numberOfQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGeneratedQuestions(response.data.questions);
      toast.success("Questions generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error.response?.data?.msg || "Failed to generate questions");
    } finally {
      setGenerating(false);
    }
  };

  const saveGeneratedQuestion = async (question) => {
    const token = Cookies.get("token");
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const payload = {
        title: question.title,
        options: question.options,
        ansIndex: question.ansIndex,
      };

      const response = await axios.post(`${apiUrl}/api/question/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions((q) => [...q, response.data.question]);
      setGeneratedQuestions((prev) =>
        prev.filter((q) => q !== question)
      );
      toast.success("Question saved!");
    } catch (error) {
      console.error("Error saving question:", error);
      toast.error("Failed to save question");
    }
  };

  const saveAllGeneratedQuestions = async () => {
    const token = Cookies.get("token");
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    
    try {
      let savedCount = 0;
      for (const question of generatedQuestions) {
        const payload = {
          title: question.title,
          options: question.options,
          ansIndex: question.ansIndex,
        };

        const response = await axios.post(`${apiUrl}/api/question/create`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions((q) => [...q, response.data.question]);
        savedCount++;
      }
      
      setGeneratedQuestions([]);
      toast.success(`${savedCount} questions saved!`);
      setActiveTab("questions");
    } catch (error) {
      console.error("Error saving questions:", error);
      toast.error("Error saving some questions");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Create Questions
        </h1>
        <p className="text-gray-600 mt-2">
          Create questions manually or generate them using AI.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="mb-8 flex gap-4">
        <Button
          onClick={() => {
            setMode("manual");
            setGeneratedQuestions([]);
          }}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            mode === "manual"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Create Manually
        </Button>
        <Button
          onClick={() => setMode("generate")}
          className={`px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            mode === "generate"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          AI Generate
        </Button>
      </div>

      {/* MANUAL MODE */}
      {mode === "manual" && (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Question Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-indigo-700 font-medium">
              Question Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your question here..."
              className="rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
              {...register("title", { required: true })}
            />
          </div>

          {/* Options Section */}
          <div className="space-y-4">
            <Label className="text-indigo-700 font-medium">
              Options (choose the correct one)
            </Label>

            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <Input
                  type="text"
                  placeholder={`Option ${option}`}
                  className="flex-1 rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  {...register(`option${option}`, { required: true })}
                />

                <Controller
                  name="ansIndex"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === option}
                      onCheckedChange={(checked) => {
                        if (checked) field.onChange(option);
                      }}
                    />
                  )}
                />
                <Label className="text-sm text-gray-600">Correct</Label>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setActiveTab("questions")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer rounded-lg bg-pink-500 text-white hover:bg-pink-600 hover:text-white shadow-md"
                  variant="outline"
                  type="button"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Talk to AI
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Chatbox />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      )}

      {/* AI GENERATE MODE */}
      {mode === "generate" && (
        <div className="space-y-8">
          {/* Topic and Context Input */}
          {generatedQuestions.length === 0 ? (
            <div className="space-y-6 bg-indigo-50 p-8 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-indigo-700 font-medium">
                  Topic
                </Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g., React Hooks, Python Functions, World History"
                  className="rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context" className="text-indigo-700 font-medium">
                  Context / Additional Details
                </Label>
                <textarea
                  id="context"
                  placeholder="Provide context or details about the topic (e.g., difficulty level, specific concepts to focus on)"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1"
                  rows="4"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="count" className="text-indigo-700 font-medium">
                  Number of Questions
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                  className="rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setMode("manual")}
                  variant="outline"
                  className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Back
                </Button>
                <Button
                  onClick={generateQuestionsFromTopic}
                  disabled={generating}
                  className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                >
                  {generating ? (
                    <>
                      <div className="animate-spin">⏳</div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Questions
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            // Display Generated Questions
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-indigo-700">
                  Generated Questions ({generatedQuestions.length})
                </h2>
                <Button
                  onClick={() => setGeneratedQuestions([])}
                  variant="outline"
                  className="rounded-lg border-gray-300 text-gray-700"
                >
                  Generate More
                </Button>
              </div>

              {generatedQuestions.map((question, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    {idx + 1}. {question.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border-2 transition ${
                          question.ansIndex === optIdx + 1
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-700">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="text-gray-800">{option}</span>
                          {question.ansIndex === optIdx + 1 && (
                            <span className="ml-auto text-green-600 font-semibold text-sm">
                              ✓ Correct
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => saveGeneratedQuestion(question)}
                    className="w-full rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Save This Question
                  </Button>
                </div>
              ))}

              <Button
                onClick={saveAllGeneratedQuestions}
                className="w-full rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 py-3 font-semibold text-lg"
              >
                Save All Questions ({generatedQuestions.length})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
