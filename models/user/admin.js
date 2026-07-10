import mongoose from "mongoose";
const Schema = mongoose.Schema;
import pkg from "passport-local-mongoose";

const adminSchema = new Schema({
    username: {
        type: String,
    },
    ngoName: {
        type: String,
    },
    location: {
        type: String,
    },
    volunteers: [{
        type: Schema.Types.ObjectId,
        ref: "Volunteer",
    }],
    meals_distributed: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }]
})

adminSchema.plugin(pkg.default ?? pkg);
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;