const express = require("express");
const cors = require("cors");
const app = express();

const adminRoutes = require("./routes/admin");

app.use(express.json()); // for parsing application/json
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);

app.listen(5000);
