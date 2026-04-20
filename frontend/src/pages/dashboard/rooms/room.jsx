import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDashboard } from "@/context/dashboardContext";
import axios from "axios";
import Cookies from "js-cookie";
import JoinRoomCard from "./joinRoomCard";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/api";
import RecentAttemptsPanel from "@/components/custom/RecentAttemptsPanel";

export default function Room() {
  const { setActiveTab, rooms } = useDashboard();
  const [openDialog, setOpenDialog] = useState(false);
  const [recentScores, setRecentScores] = useState([]);

  const navigate = useNavigate();

  const fetchRecentScores = async () => {
    const token = Cookies.get("token");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/api/score`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecentScores(response.data.scores || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addRoom = () => {
    setActiveTab("createRoom");
  };

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleJoinRoom = async (payload) => {
    const token = Cookies.get("token");
    const roomCode = payload.roomCode;

    try {
      console.log(payload, "payload");
      const response = await axios.post(`${apiUrl}/api/room/joinRoom`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/room", { state: roomCode });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecentScores();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Rooms
        </h2>
        <div className="mt-2 flex gap-4">
          <Button
            onClick={addRoom}
            size="lg"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Room
          </Button>
          <Button
            onClick={toggleDialog}
            size="lg"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            Join Room
          </Button>
        </div>
        {!openDialog &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <div
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 "
              key={room._id}
            >
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100">
                <div>
                  <h3 className="font-semibold text-lg">
                    Room Code: {room.roomCode}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Max Players Allowed: {room.maxPlayers}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Quiz Time: {room.quizDuration || 30} seconds
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                    onClick={() =>
                      handleJoinRoom({
                        roomId: room._id,
                        roomCode: room.roomCode,
                      })
                    }
                    size="sm"
                  >
                    Join
                  </Button>

                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}

        {openDialog && <JoinRoomCard handleJoinRoom={handleJoinRoom} />}

        {!openDialog && rooms.length == 0 && (
          <div className="mt-4 text-slate-600 dark:text-slate-400">
            No such rooms , create one
          </div>
        )}
      </div>

      <RecentAttemptsPanel
        attempts={recentScores}
        title="Last 10 quiz marks"
        emptyMessage="Join and complete a quiz to start building your score history."
      />
    </div>
  );
}
