const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaintaininMemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("MaintaininMember", MaintaininMemberSchema);
