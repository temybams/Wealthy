import { Request, Response } from "express"
import orderValidationSchema from "./order.validation"
import { Product } from "../products/product.model";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    try {
        const zodValidation = orderValidationSchema.safeParse(req.body);

        if (!zodValidation.success) {
            const errorLists = zodValidation.error.issues.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errorLists
            });
        }

        const { productId, quantity } = zodValidation.data;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.inventory.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory"
            });
        }

        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;

        const newOrder = await OrderServices.createANewOrder(zodValidation.data);
        await product.save();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: newOrder
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
};


 const handleGetAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderServices.getAllOrdersFromDB(req.query.email as string | undefined);

        return res.status(200).json({
            success: true,
            message: orders.length > 0 ? "Orders fetched successfully" : "No orders found",
            data: orders
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
};


 export const OrderController = {
    createOrder,
    handleGetAllOrders
 }