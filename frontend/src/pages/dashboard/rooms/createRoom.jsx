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
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function CreateRoom() {
  const [values, setValues] = useState(null);
  const [maxPlayers, setMaxPlayers] = useState("");

  const { quizzes, setActiveTab, fetchRooms } = useDashboard();

  const options = quizzes.map((q) => ({
    title: q.title,
    value: q._id,
  }));

  const handleCreateRoom = async () => {
    const token = Cookies.get("token");
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const payload = {
        quiz: values[0].value,
        maxPlayers,
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
    }
  };

  return (
    <div className="-m-6 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-xl bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-900">
            Create a Room
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Set up your room and invite others to play your quiz.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Max Players Field */}
          <div className="space-y-2">
            <Label htmlFor="maxPlayers" className="text-gray-800">
              Max Players
            </Label>
            <Input
              id="maxPlayers"
              type="number"
              placeholder="e.g. 5"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              className="bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Quiz Selector (react-select) */}
          <div className="space-y-2">
            <Label htmlFor="quizSelect" className="text-gray-800">
              Select Quiz
            </Label>
            <Select
              multi
              closeOnSelect
              placeholder="Search and select a quiz..."
              options={options}
              onChange={(values) => setValues(values)}
              labelField="title"
              valueField="value"
            />
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
