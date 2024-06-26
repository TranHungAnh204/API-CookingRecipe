const express = require('express');
const router = express.Router();
const AdminController = require('../modules/Admin/AdminController');

// Endpoint để lấy tất cả người dùng
router.get('/getAdmin', async function (req, res, next) {
    try {
        const admin = await AdminController.getAll();
        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
});

// Endpoint để đăng ký người dùng mới
router.post('/register', async function (req, res, next) {
    try {
        const { name, email, password } = req.body;
        const admin = await AdminController.register(name, email, password);
        res.status(201).json({ message: 'Đăng ký thành công', admin });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Endpoint để đăng nhập người dùng
router.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const admin = await AdminController.login(email, password);

        if (admin) {
            res.status(200).json({ message: 'Đăng nhập thành công', admin });
        } else {
            res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;