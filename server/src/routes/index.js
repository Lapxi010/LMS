import express from "express";
const router = express.Router();
import userRouter from "./UserRouter";

router.use("/users", userRouter);

export default router;
