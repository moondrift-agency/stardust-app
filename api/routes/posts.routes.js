const router = require('express').Router();
const postsController = require('../controllers/posts.controller');
const tokenChecker = require("../middleware/token.checker");
const multer = require('../middleware/multer.config');

router.get('/', /*tokenChecker,*/ postsController.getAllPosts);
router.post('/add', tokenChecker, multer, postsController.createPost);
router.get("/hot", tokenChecker, postsController.getHotPosts);
router.get("/:id", tokenChecker, postsController.getOnePost);
router.delete("/:id", tokenChecker, multer, postsController.deletePost);
router.post("/:id/like", tokenChecker, postsController.likePost);
router.post("/:id/comments", tokenChecker, postsController.addComment);
router.delete("/comments/:id", tokenChecker, postsController.deleteComment);

module.exports = router;