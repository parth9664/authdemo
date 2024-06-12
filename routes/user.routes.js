import express from "express";

import { createUser } from "../controllers/createuser.js";
import { loginUser } from "../controllers/login.js";
import { forgotPassword } from "../controllers/forgotpassword.js";
import { resetPassword } from "../controllers/resetpassword.js";
import { generatePassword } from "../controllers/generatePassword.js";
import { setpassword } from "../controllers/setpassword.js";

const router = express.Router();

// // Get all users
// router.get("/users" ,async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// })

// // Get a user by ID
// router.route("/users/:id")
// .get(async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// })
// // Update a user by ID
// .patch(async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password });
//     if (!updatedUser) {
//       return res.status(404).json({ msg: "User not found" });
//     }
//     res.json({ msg: "User updated successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// })
// // Delete a user by ID
// .delete(async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ msg: "User not found" });
//     }
//     res.json({ msg: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/path", loginuser)  // login page
router.post("/signup", createUser); ///signup api
router.post("/login", loginUser); ///login api
router.post("/generatePassword", generatePassword) //email for password genrate
router.post("/setpassword/:token", setpassword) //email for password genrate
router.post("/forgotpassword", forgotPassword); ///frogot password
router.post("/resetpassword/:tokenId", resetPassword); // reset password


export default router;
