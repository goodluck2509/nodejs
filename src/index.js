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

app.use(express.static(path.join(__dirname, "public")));
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
// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });
