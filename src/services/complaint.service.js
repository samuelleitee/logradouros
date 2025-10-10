const Complaint = require("../models/Complaint");

const createService = (body) => Complaint.create(body);
const findAllService = (offset, limit) => Complaint.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
const countComplaintService = () => Complaint.countDocuments();
// const topNewsService = () => News.findOne.sort({ _id: -1 }).populate("user");
const findByIdService = (id) => Complaint.findById(id).populate("user");
const deleteAll = () => Complaint.deleteMany({})
const deleteById = (id) => Complaint.findByIdAndDelete(id)
// const searchByTitleService = (title) => News.find({title: { $regex: `$title || ""`, $options: "i" }}).sort({ _id: -1 }).populate("user");
// const buyUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user");
// const updateService = (id, titulo, texto, banner) => News.findOneAndUpdate({ _id: id }, { titulo, texto, banner }, { rawResult: true });
// const eraseService = (id) => News.findByIdAndDelete({ _id: id });
// const likeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews, "likes.userId": { $nin: [userId] } }, { $push: { likes: { userId, createdAt: new Date() } } });
// const deleteLikeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews}, { $pull: { likes: { userId } } });
// const addCommentService = (idNews, comment, userId) => {
//     const idComment = Math.floor(Date.now() * Math.random()).toString(36);
//     return News.findOneAndUpdate({ _id: idNews }, { $push: { comments: { idComment, userId, comment, createdAt: new Date() } } });
// };
// const deleteCommentService = (idNews, idComment, userId) => News.findOneAndUpdate({ _id: idNews }, { $pull: { comments: { idComment, userId} } });

module.exports = { createService, findAllService, countComplaintService, findByIdService, deleteAll, deleteById }
// module.exports = { createService, findAllService, countNewsService, topNewsService, findByIdService, searchByTitleService, buyUserService, updateService, eraseService, likeNewsService, deleteLikeNewsService, addCommentService };