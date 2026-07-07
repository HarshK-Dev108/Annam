import express from "express";
import path from "path";
import Donate from "./models/donate.js";
import AdminLogin from "./models/user/admin.js";
import { fileURLToPath } from "url";
import ejsMate from "ejs-mate";
import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import donateSchema from "./schema.js";
import sessions from "express-session";
import passport from "passport";
import passportLocal from "passport-local";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


/* ================================
   DONATION VALIDATION
================================ */

const validateDonate = (req, res, next) => {
    const { error } = donateSchema.validate(req.body);

    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(",");

        throw new ExpressError(400, errMsg);
    }

    next();
};


/* ================================
   SESSION CONFIGURATION
================================ */

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,

    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};


/* ================================
   DATABASE CONNECTION
================================ */

const MONGO_URL = "mongodb://127.0.0.1:27017/annam";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log(err);
    });


/* ================================
   APP CONFIGURATION
================================ */

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.engine("ejs", ejsMate);


/* ================================
   MIDDLEWARE
================================ */

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    "/aos",
    express.static(
        path.join(
            __dirname,
            "node_modules",
            "aos",
            "dist"
        )
    )
);


/* ================================
   SESSION + PASSPORT
================================ */

// Session middleware MUST come before passport.session()

app.use(sessions(sessionOptions));

app.use(passport.initialize());

app.use(passport.session());

passport.use(
    new passportLocal(
        AdminLogin.authenticate()
    )
);

passport.serializeUser(
    AdminLogin.serializeUser()
);

passport.deserializeUser(
    AdminLogin.deserializeUser()
);


/* ================================
   HOME PAGE
================================ */

app.get("/", (req, res) => {
    res.render("data/home");
});


/* ================================
   DONATION ROUTES
================================ */

app.get("/donate", (req, res) => {
    res.render("data/donate");
});


app.post(
    "/donate",
    validateDonate,
    async (req, res, next) => {
        try {
            const donateData =
                new Donate(req.body.donate);

            await donateData.save();

            console.log("Donation Added");

            res.redirect("/");

        } catch (err) {
            next(err);
        }
    }
);


/* ================================
   REGISTER ROLE SELECTION
================================ */

app.get("/register", (req, res) => {
    res.render("data/register");
});


/* ================================
   ADMIN REGISTRATION
================================ */

app.get("/register/admin", (req, res) => {
    res.render("data/adminRegister");
});


app.post(
    "/register/admin",
    async (req, res, next) => {
        try {
            const {
                username,
                password,
                ngoName,
                location,
            } = req.body;

const admin = new AdminLogin({
    username,
    ngoName,
    location,
});

await AdminLogin.register(admin, password);

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


/* ================================
   ADMIN DASHBOARD
================================ */

app.get("/admin", (req, res) => {
    res.render("data/admin");
});


/* ================================
   404 HANDLER
================================ */

app.all("/{*splat}", (req, res, next) => {
    next(
        new ExpressError(
            404,
            "Page Not Found"
        )
    );
});


/* ================================
   ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
    const {
        statusCode = 500,
        message = "Something went wrong",
    } = err;

    res.status(statusCode).send(message);
});


/* ================================
   START SERVER
================================ */

app.listen(3000, () => {
    console.log(
        "Website is live at http://localhost:3000"
    );
});