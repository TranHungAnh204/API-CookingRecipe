const CategoryModel = require('./CategoryModel');

// GET ALL
const getAll = async () => {
    try {
        const categories = await CategoryModel.find();
        return categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Tạo
const insert = async (name) => {
    try {
        const newCategory = new CategoryModel({ name });
        await newCategory.save();
        return newCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// xóa
const remove = async (catId) => {
    try {
        await CategoryModel.findByIdAndDelete(catId);
        return { message: "Xóa danh mục thành công" };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const update = async (catId, name) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(catId, { name }, { new: true });
        return updatedCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getAll, insert, update, remove };
