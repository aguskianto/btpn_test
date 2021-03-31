const  express =  require("express");
const router = express.Router();
const Ctrl = require("../controllers/user.controller");
const TokenChecker = require("../middleware/TokenChecker");

router.get("/", TokenChecker.check, Ctrl.apiGetAll);
router.post("/", TokenChecker.check,Ctrl.apiCreate);
router.get("/user/:id", TokenChecker.check, Ctrl.apiGetById);
router.put("/user/:id", TokenChecker.check, Ctrl.apiUpdate);
router.delete("/user/:id", TokenChecker.check, Ctrl.apiDelete);
router.get("/user/accountNumber/:id", TokenChecker.check, Ctrl.apiGetByAccountNumber);
router.get("/user/identityNumber/:id", TokenChecker.check, Ctrl.apiGetByIdentityNumber);

module.exports =  router;