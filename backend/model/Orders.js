const mongoose = require("mongoose");
const schema = mongoose.Schema;

const OrderSchema = new schema ({
    email:{
        type:String,
        required:true,
        unique: true
    },
    order_data:{
        type:Array,
        required:true
    }
});

module.exports = mongoose.model("order",OrderSchema);