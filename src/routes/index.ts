import { Router } from "express";
import orderRouter from "./order.routes";

const router = Router();

router.use("/orders", orderRouter);

export default router;
