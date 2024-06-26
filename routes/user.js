const express = require("express");
const router = express.Router();
const UserController = require("../modules/user/UserController");
const UserModel = require("../modules/user/UserModel");

router.get("/getUser", async function (req, res, next) {
  try {
    const users = await UserController.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password, image, phone } = req.body;
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }
    const user = await UserController.register(
      name,
      email,
      password,
      image,
      phone
    );
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserController.login(email, password);

    if (user) {
      res.status(200).json({ message: "Đăng nhập thành công", user });
    } else {
      res.status(401).json({ error: "Email hoặc mật khẩu không đúng." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/updateUser/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const existingUser = await UserModel.findOne({
      email: updateData.email,
      _id: { $ne: id },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    const user = await UserController.updateUser(id, updateData);
    if (user) {
      res.status(200).json({ message: "Cập nhật thành công", user });
    } else {
      res.status(404).json({ message: "Người dùng không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
