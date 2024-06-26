const UserModel = require("./UserModel");
const bcrypt = require("bcrypt");

// Lấy tất cả người dùng từ cơ sở dữ liệu
const getAll = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Đăng ký người dùng mới
const register = async (name, email, password, image, phone) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Tạo người dùng mới với mật khẩu đã mã hóa
    const user = new UserModel({ name, email, image, phone, password: hash });
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

// Đăng nhập người dùng
const login = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Cập nhật người dùng theo ID
const updateUser = async (id, updateData) => {
  try {
    // Nếu có mật khẩu trong dữ liệu cập nhật, mã hóa mật khẩu mới
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = { getAll, register, login, updateUser };
