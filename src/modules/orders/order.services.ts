import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createANewOrder = async (orderData: TOrder) => {
    return OrderModel.create(orderData);
};

const getAllOrdersFromDB = async (query?: string) => {
    const filter = query ? { email: query } : {};
    return OrderModel.find(filter);
};

export const OrderServices = {
    createANewOrder,
    getAllOrdersFromDB
};
