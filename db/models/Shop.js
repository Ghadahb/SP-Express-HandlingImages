const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: String,
    image: { type: String },
    type: {
        type: [String],
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    } 
],
    
  },

);

ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Shop", ShopSchema);