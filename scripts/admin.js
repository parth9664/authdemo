import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const createAdmin = async () => {
  try {
    const adminExist = await User.findOne({ email:"admin@test.com" });
    if (!adminExist) {
      const newadmin = new User({
        name: "admin",
        email: "admin@test.com",
        password: await bcrypt.hash("admin", 10),
        role:"admin"
      });
      const createdAdmin = await newAdmin.save();
      console.log("admin account created");
    } else {
      console.log("already existed admin");
    }
  } catch (error) {
    console.log(error.message);
  }
};
