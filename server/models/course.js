const { mongoose } = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    description: {
        type: String,
        default: "No description found"
    },

    courseImage: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        // enum: ["Web Development", "Mobile Development", "Machine Learning", "Data Science", "Artificial Intelligence", "Cyber Security", "Game Development", "UI/UX Design", "Digital Marketing", "Cloud Computing", "Other"]
        default: ""
    },

    Price: {
        type: String,
        default: "Free"
    },

    status: {
        type: String,
        enum: ["Published", "Draft"],
        default: "Draft"
    },

    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },

    rating: {
        type: String,
        default: 3
    },

    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    courseChapters: {
        type: Number,
        default: 0
    },

    attachment: {
        type: String,
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course