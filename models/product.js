import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    ngoID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    donation: {
        type: Schema.Types.ObjectId,
        ref: "Donate",
    },
    status: {
        type: String,
        required: true,
    },
    handled_by: {
        type: String,
        required: true,
    },
})

const Product = mongoose.model("Product", productSchema);
export default Product;