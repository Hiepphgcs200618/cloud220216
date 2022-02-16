const express = require('express');
const app = express();
var path = require ("path");
const fs = require("fs");
const hostname = 'localhost';
const port = 80;
solan = 0;

app.set("views", path.join(__dirname, "views")); //setting views directory for views.
app.set("view engine", "hbs"); //setting view engine as handlebars

//--
const router = express.Router();
router.get("/", (req, res) => {
    content = fs.readFileSync("./views/home.html");
    res.end(content);
});
router.get("/about", (req, res) => {
    content = fs.readFileSync("./views/about.html");
    res.end(content);
});
router.get("/profile", (req, res) => {
    content = fs.readFileSync("./views/profile.html");
    res.end(content);
});
router.get("/products", (req, res) => {
    content = fs.readFileSync("./views/products.html");
    res.end(content);
});
router.get("/cart", (req, res) => {
    var xproducts = JSON.parse(req.query.products);
    console.log(xproducts); 
    res.render("cart", {products:xproducts})
});
//-- TEST

app.get("/people", (req, res) => {
	let peopleList = getRandomList();
	res.render("people", { people: peopleList }); //passing list of people to our index.hbs file.
});
let getRandomList = () => {
	let list = ["ada", "turing", "lovelace", "neumann", "gracehopper"];
	let limit = Math.floor(Math.random() * (list.length - 1 - 0) + 0); //generating random number between 0 & 4
	return list.slice(limit);
};

//--
app.use("/", router);
app.use(express.static("public")); // khai bao public la thu muc tinh
app.listen(process.env.port | port);
console.log(`Sever running at http://${hostname}:${process.env.port | port}`)
