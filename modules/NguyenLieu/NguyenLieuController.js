const NguyenLieuModel = require('./NguyenLieuModel');

// GET ALL
const getAll = async () => {
    try {
        const nguyenLieu = await NguyenLieuModel.find();
        return nguyenLieu;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Tạo
const insert = async (name, img) => {
    try {
        const newNguyenLieu = new NguyenLieuModel({ name, img });
        await newNguyenLieu.save();
        return newNguyenLieu;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = { getAll, insert };
