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
import { Bot, Sparkles, FileText } from "lucide-react";
import Chatbox from "@/components/custom/chatbox";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useState } from "react";
import { apiUrl } from "@/lib/api";

export default function CreateQuestion() {
  const { register, handleSubmit, control, reset } = useForm();
  const { setActiveTab, setQuestions } = useDashboard();
  const [mode, setMode] = useState("manual");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const options = [1, 2, 3];

  const onSubmit = async (data) => {
    const token = Cookies.get("token");
    try {
      const payload = {
        title: data.title,
        options: [data.option1, data.option2, data.option3],
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

  const generateQuestionsFromPDF = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file");
      return;
    }

    const token = Cookies.get("token");
    setUploading(true);
    setGenerating(true);

    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("numberOfQuestions", numberOfQuestions);

      const response = await axios.post(
        `${apiUrl}/api/talkToAI/generateFromPDF`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGeneratedQuestions(response.data.questions);
      toast.success("Questions generated successfully from PDF!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error(
        error.response?.data?.msg || "Failed to generate questions from PDF"
      );
    } finally {
      setUploading(false);
      setGenerating(false);
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const saveGeneratedQuestion = async (question) => {
    const token = Cookies.get("token");
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
      setGeneratedQuestions((prev) => prev.filter((q) => q !== question));
      toast.success("Question saved!");
    } catch (error) {
      console.error("Error saving question:", error);
      toast.error("Failed to save question");
    }
  };

  const saveAllGeneratedQuestions = async () => {
    const token = Cookies.get("token");

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
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Create Questions
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Create questions manually or generate them using AI.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <Button
          onClick={() => {
            setMode("manual");
            setGeneratedQuestions([]);
            setSelectedFile(null);
          }}
          className={`rounded-lg px-6 py-2 font-medium transition ${
            mode === "manual"
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          Create Manually
        </Button>
        <Button
          onClick={() => {
            setMode("generate");
            setGeneratedQuestions([]);
            setSelectedFile(null);
          }}
          className={`flex items-center gap-2 rounded-lg px-6 py-2 font-medium transition ${
            mode === "generate"
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          AI Generate
        </Button>
        <Button
          onClick={() => {
            setMode("pdf");
            setGeneratedQuestions([]);
            setSelectedFile(null);
          }}
          className={`flex items-center gap-2 rounded-lg px-6 py-2 font-medium transition ${
            mode === "pdf"
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <FileText className="h-4 w-4" />
          Generate from PDF
        </Button>
      </div>

      {mode === "manual" && (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="title" className="font-medium text-slate-800 dark:text-slate-200">
              Question Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your question here..."
              className="rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
              {...register("title", { required: true })}
            />
          </div>

          <div className="space-y-4">
            <Label className="font-medium text-slate-800 dark:text-slate-200">
              Options (choose the correct one)
            </Label>

            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <Input
                  type="text"
                  placeholder={`Option ${option}`}
                  className="flex-1 rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
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
                <Label className="text-sm text-slate-600 dark:text-slate-400">
                  Correct
                </Label>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
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
                  className="cursor-pointer rounded-lg bg-pink-500 text-white shadow-md hover:bg-pink-600 hover:text-white"
                  variant="outline"
                  type="button"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
              </DialogTrigger>
              <DialogContent className="p-6 sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Talk to AI</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Chatbox />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      )}

      {mode === "generate" && (
        <div className="space-y-8">
          {generatedQuestions.length === 0 ? (
            <div className="space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-950/60">
              <div className="space-y-2">
                <Label htmlFor="topic" className="font-medium text-slate-800 dark:text-slate-200">
                  Topic
                </Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g., React Hooks, Python Functions, World History"
                  className="rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context" className="font-medium text-slate-800 dark:text-slate-200">
                  Context / Additional Details
                </Label>
                <textarea
                  id="context"
                  placeholder="Provide context or details about the topic (e.g., difficulty level, specific concepts to focus on)"
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
                  rows="4"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="count" className="font-medium text-slate-800 dark:text-slate-200">
                  Number of Questions
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                  className="rounded-lg border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setMode("manual")}
                  variant="outline"
                  className="rounded-lg border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Back
                </Button>
                <Button
                  onClick={generateQuestionsFromTopic}
                  disabled={generating}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {generating ? (
                    <>
                      <div className="animate-spin">...</div>
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
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Generated Questions ({generatedQuestions.length})
                </h2>
                <Button
                  onClick={() => setGeneratedQuestions([])}
                  variant="outline"
                  className="rounded-lg border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  Generate More
                </Button>
              </div>

              {generatedQuestions.map((question, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-950/60"
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {idx + 1}. {question.title}
                  </h3>

                  <div className="mb-6 space-y-3">
                    {question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`rounded-lg border-2 p-3 transition ${
                          question.ansIndex === optIdx + 1
                            ? "border-green-500 bg-green-50"
                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="text-slate-800 dark:text-slate-100">
                            {option}
                          </span>
                          {question.ansIndex === optIdx + 1 && (
                            <span className="ml-auto text-sm font-semibold text-green-600">
                              Correct
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
                className="w-full rounded-lg bg-indigo-600 py-3 text-lg font-semibold text-white hover:bg-indigo-700"
              >
                Save All Questions ({generatedQuestions.length})
              </Button>
            </div>
          )}
        </div>
      )}

      {mode === "pdf" && (
        <div className="space-y-8">
          {generatedQuestions.length === 0 ? (
            <div className="space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-950/60">
              <div className="space-y-2">
                <Label className="font-medium text-slate-800 dark:text-slate-200">
                  Upload PDF File
                </Label>
                <div className="rounded-lg border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-950/70">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="text-4xl text-slate-700 dark:text-slate-300">
                        PDF
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {selectedFile ? (
                          <div className="space-y-2">
                            <p className="font-medium text-green-600">
                              File selected: {selectedFile.name}
                            </p>
                            <p className="text-sm">
                              Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">Click to upload PDF</p>
                            <p className="text-sm">or drag and drop</p>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                              Max file size: 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdf-count" className="font-medium text-slate-800 dark:text-slate-200">
                  Number of Questions
                </Label>
                <Input
                  id="pdf-count"
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                  className="rounded-lg border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setMode("manual")}
                  variant="outline"
                  className="rounded-lg border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Back
                </Button>
                <Button
                  onClick={generateQuestionsFromPDF}
                  disabled={generating || !selectedFile}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {generating ? (
                    <>
                      <div className="animate-spin">...</div>
                      {uploading ? "Uploading..." : "Generating..."}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate from PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Generated Questions from PDF ({generatedQuestions.length})
                </h2>
                <Button
                  onClick={() => {
                    setGeneratedQuestions([]);
                    setSelectedFile(null);
                  }}
                  variant="outline"
                  className="rounded-lg border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  Upload Another PDF
                </Button>
              </div>

              {generatedQuestions.map((question, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-950/60"
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {idx + 1}. {question.title}
                  </h3>

                  <div className="mb-6 space-y-3">
                    {question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`rounded-lg border-2 p-3 transition ${
                          question.ansIndex === optIdx + 1
                            ? "border-green-500 bg-green-50"
                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="text-slate-800 dark:text-slate-100">
                            {option}
                          </span>
                          {question.ansIndex === optIdx + 1 && (
                            <span className="ml-auto text-sm font-semibold text-green-600">
                              Correct
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
                className="w-full rounded-lg bg-indigo-600 py-3 text-lg font-semibold text-white hover:bg-indigo-700"
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
