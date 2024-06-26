const express = require('express');
const router = express.Router();
const NguyenLieuController = require('../modules/NguyenLieu/NguyenLieuController');

// lấy tất cả danh mục
router.get('/getNguyenLieu', async function (req, res, next) {
    try {
        const nguyenLieu = await NguyenLieuController.getAll();
        res.status(200).json(nguyenLieu);
    } catch (error) {
        next(error);
    }
});

// Route để thêm mới một danh mục
router.post('/add', async function (req, res, next) {
    try {
        const { name, img } = req.body;
        newNguyenLieu = await NguyenLieuController.insert(name, img);
        res.status(201).json({ message: 'Thêm thành công', newNguyenLieu });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
