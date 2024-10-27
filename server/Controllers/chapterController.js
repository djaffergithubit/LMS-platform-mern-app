const { Chapter } = require("../models/chapter")
const Course = require("../models/course")

const addChapterController = async (req, res) => {
    try {
        const { chapterTitle, courseId } = req.body
        const courseFound = await Course.findById(courseId)

        if (!courseFound) {
            return res.status(404).json({ 'message': 'course not found' })
        }

        const newChapter = new Chapter({
            chapterTitle,
            courseId
        })

        await newChapter.save()
        return res.status(201).json({'message': 'chapter created successfully'} )

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getChaptersController = async (req, res) => {
    try {
        const { courseId } = req.params
        console.log(courseId);
        
        const chaptersFound = await Chapter.find({courseId: courseId})

        if (!chaptersFound) {
            return res.status(404).json({ 'message': 'No chapters found' })
        }

        return res.status(201).json(chaptersFound)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const updateChapterController = async(req, res)=> {
    try {
        const { chapterId, data, videoUrl } = req.body
        if(videoUrl){
            await Chapter.findByIdAndUpdate(chapterId, {chapterVideo: videoUrl})
            return res.status(200).json({ 'message': 'chapter video updated successfully' })
        }
        
        await Chapter.findByIdAndUpdate(chapterId, data)

        return res.status(200).json({ 'message': 'Chapter updated successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getAllChaptersController = async (req, res) => {
    try {
        const chapters = await Chapter.find()

        if (!chapters) {
            return res.status(404).json({ 'message': 'no chapters found' })
        }

        return res.status(201).json(chapters)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = { 
    addChapterController, 
    getChaptersController, 
    updateChapterController,
    getAllChaptersController
}