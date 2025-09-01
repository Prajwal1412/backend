import { loginUsers, registerUsers } from "../Controller/user.controller.js";
export default function userRoutes(app) {
  app.post("/register", registerUsers);
  app.post("/login", loginUsers);
}
