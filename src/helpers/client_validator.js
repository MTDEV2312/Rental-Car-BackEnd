import {body,param} from 'express-validator'
import {isCedula} from 'validator-ec'


const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const singleNameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/

const validateEcuadorianPhone = (phone) => {
    // Convertir a string y limpiar el número
    const phoneString = phone.toString().trim().replace(/\s+/g, '');
    
    // Normalizar el número a formato local
    let normalizedPhone = phoneString;
    
    // Si empieza con +593, remover el +
    if (phoneString.startsWith('+593')) {
        normalizedPhone = '593' + phoneString.slice(4);
    }
    // Si empieza con 0, reemplazar con 593
    else if (phoneString.startsWith('0')) {
        normalizedPhone = '593' + phoneString.slice(1);
    }

    // Expresión regular actualizada para números ecuatorianos
    const phoneRegex = /^593(9\d{8}|[2-7]\d{7})$/;

    const isValid = phoneRegex.test(normalizedPhone);
    
    return isValid;
}

const RegisterClientValidator = [
    body('cedula')
        .trim()
        .notEmpty().withMessage('La cedula es requerida')
        .isLength({min:10}).withMessage('La cedula debe tener al menos 10 caracteres')
        .isNumeric().withMessage('La cedula debe ser un número')
        .custom((value)=>{
            if(!isCedula(value)){
                throw new Error('Cédula ecuatoriana inválida')
            }
            return true
        }),
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .matches(singleNameRegex).withMessage('El nombre debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El nombre debe tener al menos 3 caracteres y 20 caracteres'),
    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es requerido')
        .matches(singleNameRegex).withMessage('El apellido debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El apellido debe tener al menos 3 caracteres y 20 caracteres'),
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es valido')
        .matches(regexEmail).withMessage('Formato de email inválido'),
    body('fecha_nacimiento')
        .trim()
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isDate().withMessage('La fecha de nacimiento no es valida'),
    body('direccion')
        .trim()
        .notEmpty().withMessage('La dirección es requerida')
        .isLength({min:8, max:50}).withMessage('La dirección debe tener al menos 10 caracteres'),
    body('telefono')
        .trim()
        .notEmpty().withMessage('El telefono es requerido')
        .isNumeric().withMessage('El telefono debe ser un número')
        .isLength({min:10,max:10}).withMessage('El telefono debe tener 10 caracteres')
        .custom((phone) =>{
            const isValid = validateEcuadorianPhone(phone);
            if(!isValid){
                throw new Error('Número de teléfono ecuatoriano inválido')
            }
            return true
        }),
    body('ciudad')
        .trim()
        .notEmpty().withMessage("La ciudad es requerida")
        .isLength({min:3}).withMessage("La ciudad deben ser minimo 3 caracteres")
        .isAlpha().withMessage("Solo se aceptan letras")
]

const GetClientByIdValidator = [
    param('cedula')
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

const UpdateClientValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('nombre')
        .optional()
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .matches(singleNameRegex).withMessage('El nombre debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El nombre debe tener al menos 3 caracteres y 20 caracteres'),
    body('apellido')
        .optional()
        .trim()
        .notEmpty().withMessage('El apellido es requerido')
        .matches(singleNameRegex).withMessage('El apellido debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El apellido debe tener al menos 3 caracteres y 20 caracteres'),
    body('email')
        .optional()
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es valido')
        .matches(regexEmail).withMessage('Formato de email inválido'),
    body('fecha_nacimiento')
        .optional()
        .trim()
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isDate().withMessage('La fecha de nacimiento no es valida'),
    body('direccion')
        .optional()
        .trim()
        .notEmpty().withMessage('La dirección es requerida')
        .isLength({min:8, max:50}).withMessage('La dirección debe tener al menos 10 caracteres'),
    body('telefono')
        .optional()
        .trim()
        .notEmpty().withMessage('El telefono es requerido')
        .isNumeric().withMessage('El telefono debe ser un número')
        .isLength({min:10,max:10}).withMessage('El telefono debe tener 10 caracteres')
        .custom((phone) =>{
            const isValid = validateEcuadorianPhone(phone);
            if(!isValid){
                throw new Error('Número de teléfono ecuatoriano inválido')
            }
            return true
        }),
    body('ciudad')
        .optional()
        .trim()
        .notEmpty().withMessage("La ciudad es requerida")
        .isLength({min:3}).withMessage("La ciudad deben ser minimo 3 caracteres")
        .isAlpha().withMessage("Solo se aceptan letras")
]

const DeleteClientValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
]

export {
    RegisterClientValidator,
    GetClientByIdValidator,
    UpdateClientValidator,
    DeleteClientValidator
}

