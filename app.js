import express from "express";
import path from "path";
import Donate from "./models/donate.js";
import AdminLogin from "./models/user/admin.js";
import { fileURLToPath } from "url";
import ejsMate from "ejs-mate";
import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import donateSchema from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const validateDonate = (req, res, next) => {
    let {error} = donateSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


const MONGO_URL = "mongodb://127.0.0.1:27017/annam";
async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => [
    console.log("DB is connected")
]).catch((err) => {
    console.log(err)
})
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  "/aos",
  express.static(path.join(__dirname, "node_modules", "aos", "dist"))
);
app.engine('ejs', ejsMate);

app.get("/", (req, res) => {
    res.render("./data/home.ejs");
});

app.get("/donate", (req, res) => {
    res.render("./data/donate.ejs");
})

app.get("/register", (req, res) => {
    res.render("./data/register.ejs");
});

app.get("/register/admin", (req, res) => {
    res.render("./data/adminRegister.ejs");
})

app.post("/register/admin", async (req, res) => {
    const admin = new AdminLogin(req.body.admin);
    await admin.save();
    console.log("Admin Added");
    res.redirect("/");
})

app.post("/donate", validateDonate, async (req, res) => {
    const donateData = new Donate(req.body.donate);
    await donateData.save();
    console.log("Donation Added");
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Website is live at 3000!");
});
// ADMIN PAGE
// ADD THIS CODE
app.get("/admin", (req, res) => {

    res.render("./data/admin.ejs");

});
