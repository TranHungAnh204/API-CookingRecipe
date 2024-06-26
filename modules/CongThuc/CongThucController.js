const CongThucModel = require('./CongThucModel');

// LẤY TẤT CẢ CÔNG THỨC
const getAll = async () => {
    try {
        const congThucList = await CongThucModel.find();
        return congThucList;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// THÊM MỚI MỘT CÔNG THỨC
const insert = async (userID, cateID, nguyenLieuID, name, time, moTa, video, img, rate, view) => {
    try {
        const newCongThuc = new CongThucModel({ userID, cateID, nguyenLieuID, name, time, moTa, video, img, rate, view });
        await newCongThuc.save();
        return newCongThuc;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const searchByName = async (name) => {
    try {
        const regex = new RegExp(name, 'i');
        const searchResults = await CongThucModel.find({ name: { $regex: regex } });
        return searchResults;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getAll, insert, searchByName };
