const express = require("express"); // Importing the Express framework
const expressEJSLayouts = require("express-ejs-layouts"); // Importing the Express EJS layouts module
const port = 4000; // The port on which the server will run
const db = require("./config/mongoose"); // Importing the Mongoose configuration
const app = express(); // Creating an instance of the Express application

app.use(expressEJSLayouts); // Using Express EJS layouts middleware
app.use(express.urlencoded()); // Parsing URL-encoded bodies

app.use("/", require("./routes")); // Mounting the routes

app.use(express.static("./assets")); // Serving static files from the "assets" directory

app.use(require("./middlewares/ErrorMiddleware")); // Error handling middleware

app.set("view engine", "ejs"); // Setting the view engine to EJS
app.set("views", "./views"); // Setting the directory for views

app.set("layout extractStyles", true); // Extracting styles from EJS layouts
app.set("layout extractScripts", true); // Extracting scripts from EJS layouts

app.listen(port, (err) => {
  // Starting the server
  if (err) {
    console.log("Error in connecting to server"); // Error message if server fails to start
    return;
  }
  console.log(`Server is running on port : ${port}`); // Success message when the server starts running
});
