require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

const authRouts = require("./routes/auth.js");
const privateRouts = require("./routes/private.js");
// Connecting Routes
app.use("/mpd/api", authRouts);
app.use("/mpd/api/private", privateRouts);

const userListGetRoutes = require("./routes/AuthGetRoutes/AuthGetUsersRoutes.js");
const hodatacollectionRouters = require("./routes/mobitelProjectsDatabaseRoutes.js");
const mobitelProjectsDatabases = require("./routes/mobitelProjectsDatabaseRoutes.js");

// Error Handler Middleware
app.use(errorHandler);

app.use("/mpd/api", userListGetRoutes);
app.use("/mpd/api", hodatacollectionRouters);
app.use("/mpd/api", mobitelProjectsDatabases);

// Boq System with api calling
require("./routes/mobitelProjectsDatabaseRoutes.js");

require("dotenv").config({ path: "./.env" });

// --------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "/materialkit/build")));
app.get("/mpd", (req, res) =>
  res.sendFile(path.join(__dirname, "/materialkit/build/index.html"))
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/materialkit/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "/materialkit/build/index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }

// app.get("/mpd/api/mydata", (req, res) => console.log("ok"));

// --------------------------------------------------------------------------

const PORT = process.env.PORT || 8072;

const server = app.listen(PORT, () =>
  console.log(`Sever is up and running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
