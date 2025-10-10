const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pendente", "em andamento", "resolvida", "rejeitada", "arquivada"],
        default: "pendente",
        required: true
    },
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;