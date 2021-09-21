const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Course = new Schema(
  {
    // Check điều kiện ở tầng model mình phải check validator khi nhập lên mới đúng hơn
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, require: true },
    level: { type: String, require: true },
    deleteAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

//Add plugin
mongoose.plugin(slug);

Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", Course);
