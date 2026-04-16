import express from "express";
import {
  handleRegister,
  handleDelete,
  handleUpdate,
  handleLogin,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", handleRegister);

router.post("/login", handleLogin);

router.put("/update", handleUpdate);

router.delete("/delete/:id", handleDelete);

export default router;
