const path = require("path");
const express = require("express"); // ex.. là thư viện mình tải khi nãy
const db = require("./config/db/index");
const methodOverride = require("method-override");
// Connect
db.connect();

// var morgan = require('morgan');
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

const route = require("./routers"); // 1

      //-----Chỉ để test middleware (hàm function dưới xử lí các tác vụ)
            app.get(
              "/middleware",
              //Hàm xử lí (middleware) có số lượng bất kỳ
              function (req, res, next) {
                if (["vethuong", "vevip"].includes(req.query.ve)) {
                  req.face = "Phần chỉnh sửa và thay đổi";
                  next(); //hàm này để nó chạy qua middleware tiếp theo
                }
                res.status(403).json({
                  message: "Access denied",
                });
                next();
              },
              function (req, res, next) {
                res.json({
                  message: "Successfully!!",
                  face: req.face,
                });
              }
            );
      //==========================================
// use static folder
//Đánh chặn request xác định có phải file tĩnh ko (nếu file tĩnh nó đều hướng sang public)
app.use(express.static(path.join(__dirname, "public")));
//1 middleware bắt các "rượu" submit từ form lên
//nó cấu trúc lại lưu vào 1 obj (body)
app.use(
  express.urlencoded({
    extended: true,
  })
); // Đây là thằng middleware xử lí dữ liệu submit cho form
app.use(express.json()); // Gửi dữ liệu client lên server (có httpRequest, fetch, axios ...)
//Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b, // Custom funcion ở đây chứ thằng handlebar nó ko cho code trong html
    },
  })
);
//chuyển đổi HTTP từ phương thức post sang put để sửa dữ liệu
app.use(methodOverride("_method"));
// localhost --- hosting
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Route init
route(app); // 2 // Dùng thằng này để truyền chia nhỏ ra dễ quản lí

// HTTP logger
// app.use(morgan('combined'));
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
