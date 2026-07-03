import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Recieveing the responses");
})

app.listen(3000, () => {
    console.log("Website is live at 3000!");
});