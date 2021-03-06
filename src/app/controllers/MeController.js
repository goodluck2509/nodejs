const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { response } = require("express");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted()])
      .then(([courses, deleteCount]) => {
        // 2 biến này đang sử dụng cú pháp destructuring
        res.render("me/stored-courses", {
          deleteCount,
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}
module.exports = new MeController();
