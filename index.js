const express = require("express");
const expressEJSLayouts = require("express-ejs-layouts");
const port = 4000;
const db = require("./config/mongoose");
const app = express();

app.use(expressEJSLayouts);
app.use(express.urlencoded());

app.use("/", require("./routes"));

app.use(express.static("./assets"));

app.use(require("./middlewares/ErrorMiddleware"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(port, (err) => {
  if (err) {
    console.log("Error in connecting to server");
    return;
  }
  console.log(`Server is running on port : ${port}`);
});
