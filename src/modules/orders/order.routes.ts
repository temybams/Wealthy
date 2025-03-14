import express from "express";
import { OrderController } from "./order.controller";
import { catchAsync } from "../../middleware/catchAsyncMiddleware";

const router = express.Router();

router.post("/", catchAsync(OrderController.createOrder));
router.get("/", catchAsync(OrderController.handleGetAllOrders));

export const OrderRoutes = router;