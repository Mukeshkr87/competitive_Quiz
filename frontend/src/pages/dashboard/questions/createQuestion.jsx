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
import { Bot } from "lucide-react";
import Chatbox from "@/components/custom/chatbox";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function CreateQuestion() {
  const { register, handleSubmit, control } = useForm();
  const { setActiveTab, setQuestions } = useDashboard();
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
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Create a New Question
        </h1>
        <p className="text-gray-600 mt-2">
          Add a question, provide three options, and mark the correct one.
        </p>
      </div>

      {/* Form */}
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
                onClick={() => console.log("button click ai")}
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
    </div>
  );
}
