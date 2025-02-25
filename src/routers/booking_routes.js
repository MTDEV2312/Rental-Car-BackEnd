import {Router} from 'express'
import {RegisterBooking,GetBooking,GetBookingById,UpdateBooking,DeleteBooking} from '../controllers/booking_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterBookingValidation,GetBookingByIdValidation,UpdateBookingValidation,DeleteBookingValidation} from '../helpers/bookin_validation.js'

const router = Router()

router.post('/bookings/register',verifyJwt,RegisterBookingValidation,validateRequest,RegisterBooking)
router.get('/bookings',verifyJwt,GetBooking)
router.get('/bookings/:codigo',verifyJwt,GetBookingByIdValidation,validateRequest,GetBookingById)
router.patch('/bookings/update/:id',verifyJwt,UpdateBookingValidation,validateRequest,UpdateBooking)
router.delete('/bookings/delete/:id',verifyJwt,DeleteBookingValidation,validateRequest,DeleteBooking)

export default router

