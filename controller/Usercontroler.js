const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const SignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. check if all the field have been inputed
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "firstName, lastName, email, and password are required",
      });
    }

    // 2. Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 5. Success response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(418).json({
        message: " User does not Exist",
      });
    }
    const Password = await bcrypt.compare(password, User.password);
    if (!Password) {
      return res.status(605).json({
        message: "Wrong password",
      });
    }
    res.status(200).json({
      _id: User._id,
      email: User.email,
      password: User.password,
    });
  } catch (error) {
    res.status(505).json({
      message: " internal server error",
    });
  }
};

const UpdateSingleUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { id } = req.params;

  try {
    /// TO CHECK IF THE USER EXIST IN OUR DB UNDER USERS COLLECTION
    const update = await UserModel.findById(id);
    if (!update) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      update.firstName = firstName || update.firstName;
      update.lastName = lastName || update.lastName;
      update.email = email || update.email;
      update.password = password || update.password;
    }

    /// SAVING THE UPDATED USER DETAILS
    await update.save();

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({
      message: "update failed",
    });
  }
};

const deleteSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const userDelete = await UserModel.findByIdAndDelete(id);
    if (!userDelete) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /// RETURNING A SUCCESS MESSAGE
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    // where i'm handling my server error message
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const result = await UserModel.find().sort({ createdAt: -1 });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const GetSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const GetsingleUser = await UserModel.findById(id);
    if (!GetsingleUser) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json(GetsingleUser);
    }
    /// RETURNING THE USER DETAILS
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user",
    });
  }
};

module.exports = {
  SignUp,
  Login,
  UpdateSingleUser,
  deleteSingleUser,
  GetAllUser,
  GetSingleUser,
};
