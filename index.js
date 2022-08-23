// Import needed libraries
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

// Import routes

const productsRoute = require("./routes/productsRoute");
const userRoute = require("./routes/userRoute");
const router = require("./routes/userRoute");
const con = require("./lib/dbConnection");

// Configure Server
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors
app.use(express.static("public"));
app.use(cors({
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true
}));
// credentials will allow you to access the cookie on your fetch(url, 
{
credentials: 'include'
}
// This is where we check URLs and Request methods to create functionality
// GET '/' is always what will be displayed on the home page of your application
// app.get("/landing.html", express.static(__dirname + "/landing.html"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index");
});

app.use("/users", userRoute);
app.use("/products", productsRoute);
// Set up server to start listening for requests
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
