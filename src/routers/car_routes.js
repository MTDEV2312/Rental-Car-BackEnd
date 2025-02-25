import {Router} from 'express'
import {RegisterCar,GetCar,GetCarById,UpdateCar,DeleteCar} from '../controllers/car_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterCarValidator,GetCarByIdValidator,UpdateCarValidator,DeleteCarValidator} from '../helpers/car_validation.js'

const router = Router()

router.post('/cars/register',verifyJwt,RegisterCarValidator,validateRequest,RegisterCar)
router.get('/cars',verifyJwt,GetCar)
router.get('/cars/:placa',verifyJwt,GetCarByIdValidator,validateRequest,GetCarById)
router.patch('/cars/update/:id',verifyJwt,UpdateCarValidator,validateRequest,UpdateCar)
router.delete('/cars/delete/:id',verifyJwt,DeleteCarValidator,validateRequest,DeleteCar)

export default router