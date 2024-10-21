import { Router } from "express";
import { authRouter } from "./auth.routes";
import { userRouter } from "./users.routes";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);


export { router };
