const express = require("express");
const router = express.Router();
const Gateway = require("./../models/gateway");

router.get("/new", async (req, res) => {
  let gateways = await Gateway.find({ $where: "this.peripherals.length < 10" });
  res.render("peripherals/new", { availableGateways: gateways });
});

router.post("/", async (req, res) => {
  let gateway = await Gateway.findOne({ slug: req.body.gatewayPick });
  let peripheral = {
    uid: req.body.uid,
    vendor: req.body.vendor,
    dateCreated: req.body.date,
    status: req.body.status,
  };
  gateway.peripherals.push(peripheral);

  try {
    await gateway.save();
    res.redirect("/");
  } catch (err) {
    res.render("error/show", { message: err.message });
  }
});

module.exports = router;
