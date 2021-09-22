const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const CourseSchema = new Schema(
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
    timestamps: true, // bản 5. trở lên nó hổ trợ render ra ngày nhập data
  }
);
// Custom query helpers
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidtype = ["asc", "desc"].includes(req.query.type);

    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : "desc",
    });
  }
  return this;
};
//Add plugin
mongoose.plugin(slug);

CourseSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Course", CourseSchema);
