import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function JoinRoomCard({ handleJoinRoom }) {
  const [roomCode, setRoomCode] = useState(null);

  return (
    <div className="mt-8 flex justify-center">
      <Card className="w-full max-w-sm shadow-md rounded-2xl border border-indigo-100 bg-white/90 backdrop-blur-md">
        <CardHeader>
          <h2 className="text-lg font-semibold text-indigo-700 text-center">
            Enter Room Code
          </h2>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="roomCode"
                className="text-sm font-medium text-gray-700"
              >
                Room Code
              </Label>
              <Input
                id="roomCode"
                type="number"
                placeholder="e.g. 987123"
                className="rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                onChange={(e) => setRoomCode(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
              onClick={() =>
                handleJoinRoom({
                  roomCode,
                  roomId: undefined,
                })
              }
            >
              Join Room
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
