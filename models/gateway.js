const mongoose = require("mongoose");
const slugify = require("slugify");

const gatewaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serialNo: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  peripherals: {
    type: Array,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

gatewaySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  next();
});

module.exports = mongoose.model("Gateway", gatewaySchema);
