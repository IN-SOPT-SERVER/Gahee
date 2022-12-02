import { Router } from "express";
import contentsRouter from "./contentsRouter";
import userRouter from "./userRouter";

const router:Router = Router();

router.use("/contents",contentsRouter);
router.use('/user',userRouter);

export default router;