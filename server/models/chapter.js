const { default: mongoose } = require("mongoose");

const chapterSchema = new mongoose.Schema({
    chapterTitle: {
        type:String,
        required: true
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    chapterDescription: {
        type: String, 
        default: "No description found"
    },

    chapterVideo: {
        type: String,
        default: ""
    },

    freePreview: {
        type: Boolean,
        default: true
    },

    status: {
        type: String,
        default: "Draft"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

exports.Chapter = mongoose.model('Chapter', chapterSchema)