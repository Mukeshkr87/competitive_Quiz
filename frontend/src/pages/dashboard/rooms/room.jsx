/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ParticipantLobby from "../quizRoom/lobby/ParticipantLobby";
import { Plus } from "lucide-react";
import { useDashboard } from "@/context/dashboardContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import JoinRoomCard from "./joinRoomCard";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/api";

export default function Room() {
  const { setActiveTab, rooms } = useDashboard();
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rooms</h2>
      <div className="flex mt-2 gap-4">
        <Button
          onClick={addRoom}
          size="lg"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Create Room
        </Button>
        <Button
          onClick={toggleDialog}
          size="lg"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
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
            <div className="bg-white shadow rounded-xl p-4 text-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  Room Code: {room.roomCode}
                </h3>
                <p className="text-sm text-gray-600">
                  Max Players Allowed: {room.maxPlayers}
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
                  // onClick={() => handleDeleteRoom(room._id)}
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
        <div className="text-muted-foreground mt-4">
          No such rooms , create one
        </div>
      )}
    </div>
  );
}
