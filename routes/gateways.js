const express = require("express");
const router = express.Router();
const Gateway = require("../models/gateway");

let saveGatewayAndRedirect = (path) => {
  return async (req, res) => {
    let gateway = req.gateway;
    gateway.name = req.body.name;
    gateway.serialNo = req.body.serialNo;
    gateway.ipAddress = req.body.ipAddress;

    try {
      gateway = await gateway.save();
      res.redirect(`/gateways/${gateway.slug}`);
    } catch (err) {
      res.render(`gateways/${path}`, { gateway: gateway });
    }
  };
};

router.get("/new", (req, res) => {
  res.render("gateways/new", { gateway: new Gateway() });
});

router.get("/info", async (req, res) => {
  let gateways = await Gateway.find();
  res.render("gateways/info", { gateways: gateways });
});

router.get("/edit/:id", async (req, res) => {
  const gateway = await Gateway.findById(req.params.id);
  res.render("gateways/edit", { gateway: gateway });
});

router.get("/:slug", async (req, res) => {
  const gateway = await Gateway.findOne({ slug: req.params.slug });
  if (gateway === null) {
    res.redirect("/");
  }
  res.render("gateways/show", { gateway: gateway });
});

router.put("/rmdev/:id", async (req, res) => {
  let gateway = await Gateway.findOne({ slug: req.body.gtwId });
  let devices = gateway.peripherals;
  let dev = devices.find((d) => {
    return d.uid === req.params.id;
  });
  devices.splice(devices.indexOf(dev), 1);
  try {
    gateway = await gateway.save();
    res.redirect(`/gateways/${gateway.slug}`);
  } catch (err) {
    res.render("error/show", { message: err.message });
  }
});

router.post(
  "/",
  async (req, res, next) => {
    req.gateway = new Gateway();
    next();
  },
  saveGatewayAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.gateway = await Gateway.findById(req.params.id);
    next();
  },
  saveGatewayAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Gateway.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
