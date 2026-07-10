import mongoose from "mongoose";
const Schema = mongoose.Schema;
import pkg from "passport-local-mongoose";

const volunteerSchema = new Schema({
    username: {
        type: String,
    },

    location: {
        type: String,
    },
})

volunteerSchema.plugin(pkg.default ?? pkg);
const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;