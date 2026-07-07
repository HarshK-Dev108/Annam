import mongoose from "mongoose";
const Schema = mongoose.Schema;
import pkg from "passport-local-mongoose";

console.log(pkg);
console.log(typeof pkg);
console.log(typeof pkg.default);

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
})

adminSchema.plugin(pkg.default ?? pkg);
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;