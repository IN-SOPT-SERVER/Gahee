import { Router } from "express";
import contentsRouter from "./contentsRouter";

const router:Router = Router();

router.use("/contents",contentsRouter);

export default router;