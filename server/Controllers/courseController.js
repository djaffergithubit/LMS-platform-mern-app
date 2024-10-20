const { Chapter } = require("../models/chapter");
const Course = require("../models/course");
const User = require("../models/users");

const createCourseController = async(req, res) => {
    try {
        const { userId } = req.user
        const { title } = req.body
        const userFound = await User.findById(userId)

        if (!userFound) {
            return res.status(404).json({ message: 'user not found' })
        }

        const newCourse = new Course({
            title,
            teacherId: userId
        })

        await newCourse.save()
        return res.status(200).json({ 'message': 'course created successfully', id:newCourse._id })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateCourseController = async(req, res)=> {
    try {
        const { courseId, data, courseImage } = req.body
        if(req.file){
            console.log('image', req.file?.filename);
            await Course.findByIdAndUpdate(courseId, {courseImage: req.file ? req.file.filename : ''})
            return res.status(200).json({ 'message': 'Course image updated successfully' })
        }
        
        await Course.findByIdAndUpdate(courseId, data)

        return res.status(200).json({ 'message': 'Course updated successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getCursesController = async(req, res) => {
    try {
        const courses = await Course.find().populate('teacherId', 'username email')

        if (!courses) {
            return res.status(404).json({"message": "No course found"})
        }

        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({"message": error.message})
    }
}

const setCourseStatus = async (req, res) => {
    try {
        const { courseId, status } = req.body
        await Course.findByIdAndUpdate(
            courseId,
            { status }
        )

        return res.status(201).json({ 'message': 'status updated successfully' })
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getCourseChapters = async (req, res) => {
    try {
        const { courseId } = req.params
        const chapters = await Chapter.find({courseId})

        if (!chapters) {
            return res.status(500).json({ 'message': 'No chapters Found' })
        }

        return res.status(201).json(chapters)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = { 
    createCourseController, 
    getCursesController, 
    updateCourseController,
    setCourseStatus,
    getCourseChapters
}