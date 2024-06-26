const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CongThucSchema = new Schema({
    userID: [{ type: ObjectId, ref: 'User' }, { type: ObjectId, ref: 'Admin' }],
    cateID: { type: ObjectId, ref: 'Category'},
    nguyenLieuID: [
        {
            nguyenLieuID: { type: ObjectId, ref: 'NguyenLieu' },
            soLuong: { type: String }
        }
    ],
    name: { type: String, required: true },
    time: { type: Number, required: true },
    video: { type: String, default: null },
    img: { type: String, default: true },
    rate: { type: Number, default: true },
    view: { type: String, default: true },
    moTa: {
        step1: { type: String, required: true },
        step2: { type: String, required: true },
        step3: { type: String, required: true },
        step4: { type: String },
        step5: { type: String },
    },
});

module.exports = mongoose.model('CongThuc', CongThucSchema);