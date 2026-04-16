import { getRedisClient } from "../handlers/redisHandler.js";
import { Quiz } from "../models/quizModel.js";
import { Room } from "../models/roomModel.js";

export const createRoom = async (req, res) => {
  try {
    const { maxPlayers, quiz } = req.body;

    const createdBy = req.user.user.id;

    if (!createdBy || !maxPlayers || !quiz) {
      return res.status(400).json({
        msg: "Missing Fields",
      });
    }

    const quizFound = await Quiz.findById(quiz);

    if (!quizFound) {
      return res.status(400).json({
        msg: "Quiz not found",
      });
    }

    if (maxPlayers > 15) {
      return res.status(400).json({
        msg: "maximum players can be no more than 15",
      });
    }

    const roomCode = Math.floor(100000 + Math.random() * 900000);

    const room = await Room.create({
      createdBy,
      maxPlayers,
      quiz,
      roomCode,
    });

    return res.status(201).json({
      msg: "successfully created",
      room,
    });
  } catch (error) {
    console.log(error, "error in createRoom");
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const getRoom = async (req, res) => {
  try {
    const userId = req.user.user.id;

    if (!userId) {
      return res.status(400).json({
        msg: "Unauthenticated",
      });
    }

    const rooms = await Room.find({
      createdBy: userId,
    })
      .populate({
        path: "quiz",
        populate: {
          path: "questions",
          model: "Question",
        },
      })
      .select("-createdBy")
      .lean();

    return res.status(200).json({
      rooms,
      msg: "rooms",
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(400).json({
        msg: "room not found",
      });
    }

    await Room.findByIdAndDelete(roomId);

    return res.status(200).json({
      msg: "successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomId, roomCode } = req.body;

    if (!roomId && !roomCode) {
      return res.status(400).json({
        msg: "Missing Fields",
      });
    }

    const query = {};
    if (roomCode) {
      query.roomCode = roomCode;
      try {
        const client = getRedisClient();
        if (client) {
          const existsInRedis = await client.get(roomCode);
          if (existsInRedis) {
            return res.status(200).json({
              msg: "successfully joined the room",
            });
          }
        } else {
          console.log("Redis client not available in joinRoom");
        }
      } catch (redisError) {
        console.log("Redis error in joinRoom:", redisError.message);
        // Continue with database lookup if Redis fails
      }
    }
    if (roomId) query._id = roomId;

    // find in the redis , if yes return the response from there
    // if not found , do db search and save it to redis

    const room = await Room.findOne(query)
      .populate({
        path: "quiz",
        populate: {
          path: "questions",
          model: "Question",
        },
      })
      .lean();
    if (!room) {
      return res.status(400).json({
        msg: "No such room",
      });
    }

    try {
      const client = getRedisClient();
      if (client) {
        await client.setEx(room.roomCode, 900, JSON.stringify(room));
      } else {
        console.log("Redis client not available when saving room data");
      }
    } catch (redisError) {
      console.log("Redis error saving room data:", redisError.message);
      // Continue without Redis caching if it fails
    }

    return res.status(200).json({
      msg: "successfully joined the room",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "server error",
    });
  }
};
