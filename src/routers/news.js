const express = require('express');
const router = express.Router();

// Tất cả những gì liên quan đến news thì code router ở đây
// Ví dụ: news/...các liên kết con code ở đây
const newsController = require('../app/controllers/NewController');

// newsController.index
router.get('/:slug', newsController.show); // đặt thằng này lên trên để nó lướt qua trước rồi ren thằng chính kia ra
router.get('/', newsController.index);

module.exports = router;
