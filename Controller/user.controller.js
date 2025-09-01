import Users from "../Model/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function for user registration

export async function registerUsers(req, res) {
  try {
    let { userName, email, password } = req.body;
    if (password.length < 8) {
      res.send({ message: "Password Must be min 8 characters long!" });
      return;
    }
    if (await Users.findOne({ email })) {
      res.send({
        message: "User Already Exist with this Email, Please login ",
      });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      let user = await Users.create({
        userName,
        email,
        password: hashedPassword,
      });
      console.log(user);
      res.status(200).send({ message: "User Registered Successfully" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
}

// Function for user login and token generation
export async function loginUsers(req, res) {
  try {
    let { email, password } = req.body;
    let user = await Users.findOne({ email });

    if (!user) {
      res.send("User Not registered please Register");
    } else {
      let verify = await bcrypt.compare(password, user.password);
      if (!verify) {
        res.send("Incorrect Password");
      } else {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "30m" }
        );
        res
          .status(200)
          .send(
            `password matched , User Logged In and Token generated ${token}`
          );
      }
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
}

//Middleware For Token verification
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ");

  if (token[0].toLowerCase() === "bearer") {
    jwt.verify(token[1], process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.send(err.message);
      } else {
        console.log("Decoded Token:", decoded);
        next();
      }
    });
  } else {
    res.status(404).send(err.message);
  }
}
