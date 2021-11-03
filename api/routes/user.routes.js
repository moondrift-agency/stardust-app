const router = require("express").Router();
const authValidator = require("../middleware/auth.validator");
const userController = require("../controllers/user.controller");
const tokenChecker = require("../middleware/token.checker");
const multer = require("../middleware/multer.config");

router.post("/signup", authValidator.checkPseudo, authValidator.valid, userController.signup);
router.post("/login", userController.login);
router.get("/users", tokenChecker, userController.getAllUsers);
router.put("/accounts/:id?", tokenChecker, multer, userController.updateAccount);
router.get("/accounts/:id?", tokenChecker, userController.getUser);
router.delete("/accounts/:id?", tokenChecker, userController.deleteAccount);

module.exports = router;