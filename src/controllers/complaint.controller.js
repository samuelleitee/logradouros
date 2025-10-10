const complaintService = require("../services/complaint.service");

const create = async (req, res) => {
    try {
        const { title, description, category, address } = req.body; // status is optional and user will be provider by JWT
        
        if (!title || !description || !category || !address) {
            res.status(400).send({message: "Submit all fields for registration"});
        };

        const complaint = await complaintService.createService({
            title, 
            description, 
            category, 
            address,
            user: req.id
        });

        if (!complaint) {
            return res.status(404).send({ message: "Error on complaint creation" })
        };

        res.status(201).send({ 
            message: "Complaint created succesfully.",
            complaint: {
                    title, 
                    description, 
                    category, 
                    address,
                    user: req.id
                }
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);

        if(!limit) {
            limit = 5;
        };

        if(!offset) {
            offset = 0;
        };

        const complaints = await complaintService.findAllService(offset, limit);
        const total = await complaintService.countComplaintService();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (complaints.length === 0) {
            return res.status(400).send({message: "There are no complaint"});
        };

        res.status(200).send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: complaints.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                category: item.category,
                address: item.address,
                status: item.status,
                createdAt: item.createdAt,
                user: {
                    id: item.user._id,
                    name: item.user.name,
                    email: item.user.email 
                }
            }))
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

// const topComplaints = async (req, res) => {
//     try {
//         const complaint = await complaintService.topComplaintsService();

//         if (!complaint) {
//             return res.status(400).send({message: "There are no registered posts"});
//         };

//         res.send({
//             complaint: {
//                 id: complaint.id,
//                 title: complaint.title,
//                 text: complaint.text,
//                 banner: complaint.banner,
//                 likes: complaint.likes,
//                 comments: complaint.comments,
//                 name: complaint.user.name,
//                 username: complaint.user.username,
//                 avatar: complaint.user.avatar 
//             }
//         });
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     };
// };

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const complaint = await complaintService.findByIdService(id);
        if (!complaint) {
            return res.status(404).send({ message: "Complaint not found" });
        }

        return res.status(200).send({
            complaint: {
                id: complaint.id,
                title: complaint.title,
                description: complaint.description,
                category: complaint.category,
                address: complaint.address,
                status: complaint.status,
                createdAt: complaint.createdAt,
                user: {
                    id: complaint.user._id,
                    name: complaint.user.name,
                    email: complaint.user.email,
                },
            },
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

const deleteById = async (req, res) => {
   try {
        const id = req.params.id;

        const deletedComplaint = await complaintService.deleteById(id)

        if (!deletedComplaint) {
            return res.status(404).send({ message: "Complaint not found" });
        }

        res.status(200).json({message: "Denúncia deletada com sucesso!", deletedComplaint})
    } catch (error) {
        res.status(500).send({message: error.message});
    };
}

const deleteAll = async (req, res) => {
    try {
        await complaintService.deleteAll()

        res.status(200).send({message: "Todos as denúncias foram deletados com sucesso!"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

// const searchByTitle = async (req, res) => {
//     try {
//         const { title } = req.query
//         const complaint = await complaintService.searchByTitleService(title);

//         if (complaint.length === 0) {
//             return res.status(400).send({message: "There are no complaint with this title"});
//         };

//         return res.send({
//             results: complaint.map(item => ({
//                 id: item.id,
//                 title: item.title,
//                 text: item.text,
//                 banner: item.banner,
//                 likes: item.likes,
//                 comments: item.comments,
//                 name: item.user.name,
//                 username: item.user.username,
//                 avatar: item.user.avatar 
//             }))
//         });
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     }
// };

// const byUser = async (req, res) => {
//     try {
//         const id = req.id;
//         const complaint = await complaintService.buyUserService(id);

//         return res.send({
//             results: complaint.map(item => ({
//                 id: item.id,
//                 title: item.title,
//                 text: item.text,
//                 banner: item.banner,
//                 likes: item.likes,
//                 comments: item.comments,
//                 name: item.user.name,
//                 username: item.user.username,
//                 avatar: item.user.avatar 
//             }))
//         });
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     };
// };

// const update = async (req, res) => {
//     try {
//         const { title, text, banner } = req.body;
//         const { id } = req.params

//         if (!title || !text || !banner) {
//             res.status(400).send({message: "Submit all fields for registration"});
//         };

//         const complaint = await complaintService.findByIdService(id);

//         if(complaint.user.id != req.id) {
//             return res.status(400).send({message: "You can't update this post"});
//         };

//         await complaintService.updateService(id, title, text, banner);

//         return res.send({message: "Post succesfully updated!"});
//     } catch (error) {
//         res.status(500).send({message: error.message}); 
//     };  
// };

// const erase = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const complaint = complaintService.findByIdService(id);

//         if (complaint.user.id != req.id) {
//             return res.status(400).send({message: "You can't update this post"});
//         };

//         await complaintService.eraseService(id);
//         return res.send({message: "Complaint deleted succesfully!"});
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     };
// };

// const likeComplaint = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const userId = req.id;
//         const complaintLiked = await complaintService.likeComplaintService(id, userId);

//         if (!complaintLiked) {
//             await complaintService.deleteLikeComplaintService();
//             return res.status(200).send({message: "Like succesfully removed"});
//         };

//         res.send({message: "Like Done Succesfully"});
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     };
// };

// const addComment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { userId } = req.id;
//         const { comment } = req.body;

//         if (!comment) {
//             return res.status(400).send({message: "Write a message to comment"});
//         };

//         await complaintService.addCommentService(id, comment, userId);

//         res.send({message: "Comment succesfully completed!"});
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     };
// };

// const deleteComment = async (req, res) => {
//     try {
//         const { idComplaint, idComment } = req.params
//         const { userId } = req.id;

//         const commentDeleted = await complaintService.deleteCommentService(id, comment, userId);
//         const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment)

//         if(!commentFinder) {
//             return (res.status(400).send({message: "Comment not found"}));
//         };

//         if (commentDeleted.userId !== userId) {
//             return (res.status(400).send({message: "You can't delete this comment"}));
//         };

//         res.send({message: "Comment succesfully removed!"});
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     }
// };

module.exports = { create, findAll, findById, deleteAll, deleteById }

// module.exports = { create, findAll, topComplaints, findById, searchByTitle, byUser, update, erase, likeComplaint, addComment, deleteComment };