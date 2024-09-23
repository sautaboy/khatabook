import express from 'express';
import fs from 'fs';
import path from 'path';
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// current date
const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = currentDate.getFullYear();
const formattedDate = `${day}-${month}-${year}`;




app.get("/", (req, res) => {
    fs.readdir("./files", (err, files, filename) => {
        if (err) return res.send(err.message);
        res.render("index", { files, filename });
    })
})

app.get("/create-new-hisab", (req, res) => {
    res.render("create-new-hisab")
})

app.post("/create-hisab", (req, res) => {
    fs.writeFile(`./files/${formattedDate}.txt`, `${req.body.hisab_details}`, (err) => {
        if (err) return res.send(err.message)
        console.log("Hisab Created")
    })
    res.redirect("/")
})

app.get("/read-hisab/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, data) => {
        if (err) return res.send(err.message)
        res.render("read-hisab", { data, filename: req.params.filename })
    })
})

app.get("/edit-hisab/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf8", (err, data) => {
        if (err) return res.send(err.message)
        res.render("edit-hisab", { data, filename: req.params.filename })
    })
})

app.post("/update/:filename", (req, res) => {
    fs.writeFile(`./files/${req.params.filename}`, `${req.body.hisab_details}`, (err) => {
        if (err) res.send(err.message)
        console.log("File updated")
    })
    res.redirect("/")
})

app.get("/delete/:filename", (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        if (err) return res.send(err.message)
        res.redirect("/")
    })
})















app.listen(3000);