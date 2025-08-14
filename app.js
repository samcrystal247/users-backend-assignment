const express = require("express");
const dotenv = require("dotenv").config();

const UserRoutes = require("./routes/UserRoute");
const MailRoutes = require("./routes/MailRoute");
const connectDB = require("./Config/db");
const colors = require("colors");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

connectDB();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

app.use("/api/Users", UserRoutes);

app.use("/Mail", MailRoutes);

app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
