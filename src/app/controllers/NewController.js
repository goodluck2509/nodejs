class NewController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }
    // [GET] /news/:slug
    show(req, res) {
        res.send('News detail');
    }
}
module.exports = new NewController(); // Tạo ra 1 đối tượng và exports ra ngoài
