const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] list
    show(req, res, next ) {
        Course.findOne({ slug: req.params.slug })
        .then(course => {
            res.render('courses/show', { course: mongooseToObject(course) });
        })
        .catch(next);
        // res.send('Hello' + req.params.slug );
    }
    // [GET] /courses/create
    create(req, res, next ) {
        res.render('courses/create');
    }
    // [POST] /courses/store
    store(req, res, next ) {
        // Nhận và lưu dữ liệu
        const formData = {...req.body};// cú pháp tạo nên ổ nhớ mới
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(error =>{

            });
    }
     // [GET] /courses/:id/edit 
    edit(req, res, next ) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', { course: mongooseToObject(course) } ))
            .catch(next);
    }
     // Sửa dữ liệu [PUT] /courses/:id
     update(req, res, next ) {
        Course.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
            console.log('body', req.body);
            console.log('id', req.params.id);
    }
     // [SORT DELETE] /courses/:id
     delete(req, res, next ) {
        Course.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
     // [PATCH] /courses/:id/restore
    restore(req, res, next ) {
        Course.restore({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
     // [DELETE] /courses/:id/forcceDelete
     forceDelete(req, res, next ) {
        Course.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
     // [POST] /courses/handle-form-actions
     handleFormActions(req, res, next ) {
         switch(req.body.action){
            case 'delete':  
                Course.delete({ _id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!' });
         }
    }
    // [POST] /courses/handle-form-actions-restore
    // handleFormActionsRestore(req, res, next ) {
    //     switch(req.body.action){
    //        case 'restore':  
    //            Course.restore({ _id: {$in: req.body.courseIds}})
    //                .then(() => res.redirect('back'))
    //                .catch(next);
    //            break;
    //        default:
    //            res.json({message: 'Restore is invalid!' });
    //     }
    // }
}
module.exports = new CourseController();
