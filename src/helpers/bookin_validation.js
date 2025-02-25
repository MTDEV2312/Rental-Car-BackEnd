import {body,param} from 'express-validator'
import {isCedula} from 'validator-ec'
import {validarPlaca} from './car_validation.js'

const RegisterBookingValidation = [
    body('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("La descripcion debe tener min 10 y max 500 caracteres"),
    body('vehiculo')
        .trim()
        .notEmpty().withMessage("La placa es requerida")
        .custom(placa =>{
            const IsValid = validarPlaca(placa)
            if(!IsValid){
                throw new Error("Formato de Placa invalida Ej: ABC-1234")
            }
            return true
        }),
    body('cliente')
        .trim()
        .notEmpty().withMessage('La cedula es requerida')
        .isLength({min:10}).withMessage('La cedula debe tener al menos 10 caracteres')
        .isNumeric().withMessage('La cedula debe ser un número')
        .custom((value)=>{
            if(!isCedula(value)){
                throw new Error('Cédula ecuatoriana inválida')
            }
            return true
        })
]

const GetBookingByIdValidation = [
    param('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido"),
]

const UpdateBookingValidation = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('descripcion')
        .optional()
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("La descripcion debe tener min 10 y max 500 caracteres"),
    body('vehiculo')
        .optional()
        .trim()
        .notEmpty().withMessage("La placa es requerida")
        .custom(placa =>{
            const IsValid = validarPlaca(placa)
            if(!IsValid){
                throw new Error("Formato de Placa invalida Ej: ABC-1234")
            }
            return true
        })
]

const DeleteBookingValidation = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido')
]

export {
    RegisterBookingValidation,
    GetBookingByIdValidation,
    UpdateBookingValidation,
    DeleteBookingValidation
}