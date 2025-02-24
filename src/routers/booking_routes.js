import {Router} from 'express'
import {RegisterBooking,GetBooking,GetBookingById,UpdateBooking,DeleteBooking} from '../controllers/booking_controller.js'

const router = Router()

router.post('/bookings/register',RegisterBooking)
router.get('/bookings',GetBooking)
router.get('/bookings/:codigo',GetBookingById)
router.patch('/bookings/update/:id',UpdateBooking)
router.delete('/bookings/delete/:id',DeleteBooking)

export default router

