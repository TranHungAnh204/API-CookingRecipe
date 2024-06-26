const express = require('express');
const router = express.Router();
const CongThucController = require('../modules/CongThuc/CongThucController');
const NguyenLieuController = require('../modules/NguyenLieu/NguyenLieuController');

// LẤY TẤT CẢ CÔNG THỨC
router.get('/getCongThuc', async function (req, res, next) {
    try {
        const congThucList = await CongThucController.getAll();
        res.status(200).json(congThucList);
    } catch (error) {
        next(error);
    }
});

// THÊM MỚI MỘT CÔNG THỨC
router.post('/add', async function (req, res, next) {
    try {
        const { userID, cateID, nguyenLieuID, name, time, moTa, video, img, rate, view } = req.body;
        const newCongThuc = await CongThucController.insert(userID, cateID, nguyenLieuID, name, time, moTa, video, img, rate, view);
        res.status(201).json({ message: 'Thêm thành công', newCongThuc });
    } catch (error) {
        next(error);
    }
});

// Tìm kiếm sản phẩm dựa trên tên
router.post('/searchName/:name', async function (req, res, next) {
    try {
        const { name } = req.params;
        const searchResults = await CongThucController.searchByName(name);
        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy kết quả phù hợp' });
        }
        res.status(200).json(searchResults);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;
