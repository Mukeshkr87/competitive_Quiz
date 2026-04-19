import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function JoinRoomCard({ handleJoinRoom }) {
  const [roomCode, setRoomCode] = useState(null);

  return (
    <div className="mt-8 flex justify-center">
      <Card className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white/95 shadow-md backdrop-blur-md dark:border-slate-700 dark:bg-slate-950/80">
        <CardHeader>
          <h2 className="text-center text-lg font-semibold text-slate-900 dark:text-slate-100">
            Enter Room Code
          </h2>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="roomCode"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Room Code
              </Label>
              <Input
                id="roomCode"
                type="number"
                placeholder="e.g. 987123"
                className="rounded-lg border-gray-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
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
