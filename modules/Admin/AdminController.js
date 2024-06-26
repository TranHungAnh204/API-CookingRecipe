const AdminModel = require('./AdminModel');
const bcrypt = require('bcrypt');


// Lấy tất cả Admin từ cơ sở dữ liệu
const getAll = async () => {
    try {
        const admins = await AdminModel.find();
        return admins;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Đăng ký người dùng mới
const register = async (name, email, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Tạo người dùng mới với mật khẩu đã mã hóa
        const admin = new AdminModel({ name, email, password: hash });
        await admin.save();

        return admin;
    } catch (error) {
        throw error;
    }
}

// Đăng nhập người dùng
const login = async (email, password) => {
    try {
        const admin = await AdminModel.findOne({ email });

        if (admin && bcrypt.compareSync(password, admin.password)) {
            return admin;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAll, register, login };