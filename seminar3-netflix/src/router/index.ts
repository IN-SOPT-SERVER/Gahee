import { Router } from "express";
import contentsRouter from "./contentsRouter";
import userRouter from "./userRouter";
import imageRouter from "./imageRouter";
const router:Router = Router();

router.use("/contents",contentsRouter);
router.use('/user',userRouter);
router.use("/image",imageRouter);
export default router;