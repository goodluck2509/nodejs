const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET]
    index(req, res, next) { // 1 Vào được controller
        //Đây là cách viết callback
        // Course.find({}, function (err, courses){ // Tương tác với model ở đây
        //    if(!err) {
        //     res.json(courses);
        //    } 
        //    else {
        //     res.status(400).json({error: 'ERROR'})
        //    }
        //});
        //Giờ dùng promise cho nó tiện
        Course.find({}) //2 Chọc vào model
        .then(courses => { // 3 Lấy data từ model
            res.render('home', { courses: mutipleMongooseToObject(courses) }) // 4 Trả về cho view truyền thêm data
            // code thêm hàm muti này do lỗi thằng handlebar từ bản 4.6 trở lên nó bảo mât
            // không cho truyền this trực tiếp từ data nên phải convert thằng arr ra obj rồi trả về lại
        })
        .catch(next);
    }
    // [GET] /seach
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController(); // Tạo ra 1 đối tượng và exports ra ngoài
