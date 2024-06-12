import User from "../model/user.model.js";


export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(403).json({ message: "user already exists" });
    }


    
    const newUser = new User({
      name,
      password : "",
      email,
      role: "customer",
    });

    const saveUser = await newUser.save();
    res.status(200).json(saveUser);



  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
