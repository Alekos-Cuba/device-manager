const express = require("express");
const router = express.Router();

router.get("/show", (req, res) => {
  res.render("error/show", { message: req.params.message });
});

module.exports = router;
