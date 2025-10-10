const route = require("express").Router();
const complaintController = require("../controllers/complaint.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { validId } = require("../middlewares/global.middleware");

route.post("/", authMiddleware, complaintController.create);
route.get("/", complaintController.findAll);
// route.get("/top", complaintController.topNews);
// route.get("/search", complaintController.searchByTitle);
// route.get("/byUser", authMiddleware, complaintController.byUser);
route.get("/:id", authMiddleware, validId, complaintController.findById);
// route.patch("/:id", authMiddleware, complaintController.update);
// route.delete("/:id", authMiddleware, complaintController.erase);
// route.patch("/like/:id", authMiddleware, complaintController.likeNews);
// route.patch("/comment/:id", authMiddleware, complaintController.addComment);
// route.patch("/comment/:idNews/:idComment", authMiddleware, complaintController.deleteComment);
route.delete("/", complaintController.deleteAll)
route.delete("/:id", validId, complaintController.deleteById)

module.exports = route;