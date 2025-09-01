import {
  getCartItems,
  addToCart,
  updateCart,
  deleteCartItem,
} from "../Controller/cart.controller.js";
import { verifyToken } from "../Controller/user.controller.js";
export default function cartRoutes(app) {
  app.get("/cart/:userId", verifyToken, getCartItems);
  app.post("/cart", verifyToken, addToCart);
  app.put("/cart/:userId", verifyToken, updateCart);
  app.delete("/cart/:userId/:productId", verifyToken, deleteCartItem);
}
