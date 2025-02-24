import {Router} from 'express'
import {RegisterBooking,GetBooking,GetBookingById,UpdateBooking,DeleteBooking} from '../controllers/booking_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
const router = Router()

router.post('/bookings/register',verifyJwt,RegisterBooking)
router.get('/bookings',verifyJwt,GetBooking)
router.get('/bookings/:codigo',verifyJwt,GetBookingById)
router.patch('/bookings/update/:id',verifyJwt,UpdateBooking)
router.delete('/bookings/delete/:id',verifyJwt,DeleteBooking)

export default router

