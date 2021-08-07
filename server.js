require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const gatewayRouter = require("./routes/gateways");
const peripheralRouter = require("./routes/peripherals");
const errorRouter = require("./routes/error");
const Gateway = require("./models/gateway");
const app = express();

//for testing in cloud
//"mongodb+srv://alekos:alekos86@cluster0.32nde.mongodb.net/gateways?retryWrites=true&w=majority"
mongoose.connect(
  `${process.env.DATABASE_CONTEXT}${process.env.DATABASE_NAME}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.set("view engine", "ejs");

// this line needs to go before setting routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const gateways = await Gateway.find().sort({ name: "asc" });
  res.render("index", {
    gateways: gateways,
  });
});

app.use("/gateways", gatewayRouter);
app.use("/peripherals", peripheralRouter);
app.use("/error", errorRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started and listening on port: ${process.env.APP_PORT}`);
});
