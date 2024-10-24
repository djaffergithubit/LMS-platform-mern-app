const express = require('express')
const isAuth = require('../middleware/isAuth')
const { createCourseController, getCursesController, updateCourseController, setCourseStatus, getCourseChapters, getCourse } = require('../Controllers/courseController')
const router = express.Router()
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

router.post('/update-status', isAuth, setCourseStatus)
router.post('/add-course', isAuth, createCourseController)
router.get('/get-courses', isAuth, getCursesController)
router.post('/update-course', isAuth, updateCourseController)
router.get('/:courseId', isAuth, getCourseChapters)
router.get('/single-course/:courseId', isAuth, getCourse)
router.post('/checkout-session', isAuth, async (req, res) => {
    try {
        const { course } = req.body

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:
                [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: course.title,
                        },
                        unit_amount: course.Price * 100,
                    },
                    quantity: 1,
                }]
            ,
            mode: 'payment',
            success_url: `http://localhost:5173/courses/${course._id}`,
            cancel_url: 'http://localhost:5173/failed',
            metadata: {
                courseId: course._id, 
                userId: req.user.userId,
            },

        })

        return res.status(201).json({id: session.id})

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
})


module.exports = router