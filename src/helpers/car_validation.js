import {body,param} from 'express-validator'

export function validarPlaca(placa) {
    const patron = /^[A-Z]{3}-\d{4}$/ // Expresión regular para el formato "ABC-1234"
    return patron.test(placa)
}

const regex = /^[A-Za-z0-9]+([ \-\/][A-Za-z0-9]+)*$/

const tiposVehiculosPermitidos = ['Sedán', 'Hatchback', 'SUV', 'Coupé', 'Convertible', 'Pickup', 'Van', 'Wagon']


const RegisterCarValidator = [
    body('placa')
        .trim()
        .notEmpty().withMessage("La placa es requerida")
        .custom(placa =>{
            const IsValid = validarPlaca(placa)
            if(!IsValid){
                throw new Error("Formato de Placa invalida Ej: ABC-1234")
            }
            return true
        }),
    body('marca')
        .trim()
        .notEmpty().withMessage("La marca es requerida")
        .isAlpha().withMessage("La marca solo puede tener letras sin espacios")
        .isLength({min:2}).withMessage("La marca debe ser min 2 caracteres"),
    body('modelo')
        .trim()
        .notEmpty().withMessage("El modelo es requerido")
        .matches(regex).withMessage("El formato del modelo no es valido")
        .isLength({min:2}).withMessage("El modelo requiere de min 2 caracteres"),
    body('tipo_vehiculo')
        .trim()
        .notEmpty().withMessage("El tipo es requerido")
        .isIn(tiposVehiculosPermitidos).withMessage("Tipo no permitido"),
    body('color')
        .trim()
        .notEmpty().withMessage('El color es requerido')
        .isLength({min:3}).withMessage("El color debe ser de min 3 caracteres")
        .isAlpha().withMessage("Solo se permiten letras"),
    body('anio_fabricacion')
        .trim()
        .isDate().withMessage("No es una fecha valida")
        .notEmpty().withMessage("el año de fabricacion es requerido"),
    body('kilometraje')
        .trim()
        .notEmpty().withMessage('El kilometraje es requerido')
        .isNumeric().withMessage('Solo se aceptan numeros')
        .isFloat({min:0}).withMessage("El kilometraje debe ser un número mayor o igual a 0."),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:300}).withMessage("La descripcion requiere un min de 10 y un max 300 caracteres")
]

const GetCarByIdValidator = [
    param('placa')
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

const UpdateCarValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('marca')
        .optional()
        .trim()
        .notEmpty().withMessage("La marca es requerida")
        .isAlpha().withMessage("La marca solo puede tener letras sin espacios")
        .isLength({min:2}).withMessage("La marca debe ser min 2 caracteres"),
    body('modelo')
        .optional()
        .trim()
        .notEmpty().withMessage("El modelo es requerido")
        .matches(regex).withMessage("El formato del modelo no es valido")
        .isLength({min:2}).withMessage("El modelo requiere de min 2 caracteres"),
    body('tipo_vehiculo')
        .optional()
        .trim()
        .notEmpty().withMessage("El tipo es requerido")
        .isIn(tiposVehiculosPermitidos).withMessage("Tipo no permitido"),
    body('color')
        .optional()
        .trim()
        .notEmpty().withMessage('El color es requerido')
        .isLength({min:3}).withMessage("El color debe ser de min 3 caracteres")
        .isAlpha().withMessage("Solo se permiten letras"),
    body('anio_fabricacion')
        .optional()
        .trim()
        .isDate().withMessage("No es una fecha valida")
        .notEmpty().withMessage("el año de fabricacion es requerido"),
    body('kilometraje')
        .optional()
        .trim()
        .notEmpty().withMessage('El kilometraje es requerido')
        .isNumeric().withMessage('Solo se aceptan numeros')
        .isFloat({min:0}).withMessage("El kilometraje debe ser un número mayor o igual a 0."),
    body('descripcion')
        .optional()
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:300}).withMessage("La descripcion requiere un min de 10 y un max 300 caracteres")
]

const DeleteCarValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
]

export{
    RegisterCarValidator,
    GetCarByIdValidator,
    UpdateCarValidator,
    DeleteCarValidator
}