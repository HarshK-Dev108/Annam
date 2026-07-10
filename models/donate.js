import mongoose from "mongoose";
const Schema = mongoose.Schema;

const donateSchema = new Schema({
    name: {
        type: String,
    },
    quantity: {
        type: String,
        required: true,
    },
    pickupTime: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
})

const Donate = mongoose.model("Donate", donateSchema);
export default Donate;