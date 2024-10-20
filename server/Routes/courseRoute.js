const express = require('express')
const isAuth = require('../middleware/isAuth')
const { createCourseController, getCursesController, updateCourseController, setCourseStatus, getCourseChapters } = require('../Controllers/courseController')
const router = express.Router()

router.post('/update-status', isAuth, setCourseStatus)
router.post('/add-course', isAuth, createCourseController)
router.get('/get-courses', isAuth, getCursesController)
router.post('/update-course', isAuth, updateCourseController)
router.get('/:courseId', isAuth, getCourseChapters)

module.exports = router