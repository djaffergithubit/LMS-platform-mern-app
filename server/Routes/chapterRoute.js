const express = require('express')
const isAuth = require('../middleware/isAuth')
const { addChapterController, getChaptersController, updateChapterController, getAllChaptersController } = require('../Controllers/chapterController')
const router = express.Router()

router.get('/', isAuth, getAllChaptersController)
router.post('/add-chapter', isAuth, addChapterController)
router.get('/:courseId', isAuth, getChaptersController)
router.post('/update-chapter', isAuth, updateChapterController)

module.exports = router