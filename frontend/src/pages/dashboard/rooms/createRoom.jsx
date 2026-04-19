import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Select from "react-dropdown-select";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useDashboard } from "@/context/dashboardContext";
import { useTheme } from "@/context/themeContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";

export default function CreateRoom() {
  const [values, setValues] = useState(null);
  const [maxPlayers, setMaxPlayers] = useState("");
  const [quizDuration, setQuizDuration] = useState("30");

  const { quizzes, setActiveTab, fetchRooms } = useDashboard();
  const { theme } = useTheme();

  const options = quizzes.map((q) => ({
    title: q.title,
    value: q._id,
  }));
  const isDarkMode = theme === "dark";

  const handleCreateRoom = async () => {
    const token = Cookies.get("token");

    if (!values?.length) {
      toast.error("Please select a quiz");
      return;
    }

    try {
      const payload = {
        quiz: values[0].value,
        maxPlayers,
        quizDuration,
      };
      console.log(payload);

      const response = await axios.post(`${apiUrl}/api/room/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Created");
      fetchRooms();
      setActiveTab("rooms");
      console.log(response.data, "response after creating room");
    } catch (error) {
      console.log(error, "error while creating room");
      toast.error(error?.response?.data?.msg || "Unable to create room");
    }
  };

  return (
    <div className="-m-6 flex min-h-screen items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <Card className="w-full max-w-md border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-950/60">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Create a Room
          </CardTitle>
          <CardDescription className="text-center text-slate-500 dark:text-slate-400">
            Set up your room and invite others to play your quiz.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Max Players Field */}
          <div className="space-y-2">
            <Label
              htmlFor="maxPlayers"
              className="text-slate-800 dark:text-slate-200"
            >
              Max Players
            </Label>
            <Input
              id="maxPlayers"
              type="number"
              placeholder="e.g. 5"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="quizDuration"
              className="text-slate-800 dark:text-slate-200"
            >
              Quiz Time (seconds)
            </Label>
            <Input
              id="quizDuration"
              type="number"
              min="10"
              max="300"
              placeholder="e.g. 30"
              value={quizDuration}
              onChange={(e) => setQuizDuration(e.target.value)}
              className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
            />
          </div>

          {/* Quiz Selector (react-select) */}
          <div className="space-y-2">
            <Label
              htmlFor="quizSelect"
              className="text-slate-800 dark:text-slate-200"
            >
              Select Quiz
            </Label>
            <div className="rounded-lg border border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
              <Select
                multi
                closeOnSelect
                placeholder="Search and select a quiz..."
                options={options}
                onChange={(values) => setValues(values)}
                labelField="title"
                valueField="value"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: isDarkMode ? "#f8fafc" : "#0f172a",
                  boxShadow: "none",
                }}
                dropdownStyle={{
                  background: isDarkMode ? "#020617" : "#ffffff",
                  border: `1px solid ${isDarkMode ? "#334155" : "#cbd5e1"}`,
                  color: isDarkMode ? "#f8fafc" : "#0f172a",
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
                }}
                itemRenderer={({ item, methods }) => (
                  <div
                    key={item.value}
                    onClick={() => methods.addItem(item)}
                    style={{
                      color: isDarkMode ? "#f8fafc" : "#0f172a",
                      backgroundColor: "transparent",
                    }}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {item.title}
                  </div>
                )}
                contentRenderer={({ props, state }) => {
                  const selectedCount = state.values.length;

                  if (!selectedCount) {
                    return (
                      <span className="text-slate-500 dark:text-slate-400">
                        {props.placeholder}
                      </span>
                    );
                  }

                  return (
                    <span className="text-slate-900 dark:text-slate-100">
                      {state.values.map((item) => item.title).join(", ")}
                    </span>
                  );
                }}
                color="#4f46e5"
                dropdownHandle={true}
                dropdownGap={0}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2"
            onClick={handleCreateRoom}
          >
            Create Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
