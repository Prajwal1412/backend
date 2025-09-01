import {
  getAllProducts,
  getProductById,
} from "../Controller/products.controller.js";
import { verifyToken } from "../Controller/user.controller.js";
export function productRoutes(app) {
  app.get("/products", verifyToken, getAllProducts);
  app.get("/products/:id", verifyToken, getProductById);
}
