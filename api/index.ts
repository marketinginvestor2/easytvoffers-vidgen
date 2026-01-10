import express from "express";
import cors from "cors";
import checkoutRouter from "./checkout";
import sessionRouter from "./session";

const api = express.Router();

api.use(cors({ origin: true }));
api.use(express.json());

// Mount routers
api.use("/checkout", checkoutRouter); // /api/checkout/...
api.use("/", sessionRouter);          // /api/session

export default api;
