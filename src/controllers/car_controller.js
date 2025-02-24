import Car from '../models/car_model.js'

const RegisterCar = async (req, res) => {
    try {
        const { placa } = req.body

        //? Verifica si un campo esta vacio
        if (Object.values(req.body).includes("")) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
        }

        const CarsBDD = await Car.findOne({ placa: placa })
        if (CarsBDD) { return res.status(400).json({ msg: "La placa ya se encuentra registrada" }) }

        const newCar = new Car(req.body)
        await newCar.save()
        return res.status(201).json({ msg: "Vehiculo registrado exitosamente" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

const GetCar = async (req, res) => {
    try {
        const CarBDD = await Car.find()

        const response = CarBDD.map(car => ({
            _id: car.id,
            placa: car.placa,
            marca: car.marca,
            modelo: car.modelo,
            tipo_vehiculo: car.tipo_vehiculo,
            color: car.color,
            anio_fabricacion: car.anio_fabricacion,
            kilometraje: car.kilometraje,
            descripcion: car.descripcion
        }))

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

const GetCarById = async (req, res) => {
    const { placa } = req.params

    if (!placa) { return res.satus(400).json({ msg: "La placa es necesaria" }) }

    try {
        const CarBDD = await Car.findOne({ placa: placa })

        if (!CarBDD) { return res.status(400).json({ msg: "El Vehiculo no existe" }) }

        const response = {
            _id: CarBDD.id,
            placa: CarBDD.placa,
            marca: CarBDD.marca,
            modelo: CarBDD.modelo,
            tipo_vehiculo: CarBDD.tipo_vehiculo,
            color: CarBDD.color,
            anio_fabricacion: CarBDD.anio_fabricacion,
            kilometraje: CarBDD.kilometraje,
            descripcion: CarBDD.descripcion
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

const UpdateCar = async(req, res) => {
    const { id } = req.params
    const updates = req.body
    if (!id) { return res.status(400).json({ msg: "Lo sentimos, debes proporcionar un id" }) }
    try {
        // Obtener los datos del tecnico a actualizar
        const validFields = ['marca', 'modelo', 'tipo_vehiculo', 'color', 'kilometraje', 'descripcion']
        const filteredFields = {}

        for (const field in updates) {
            if (validFields.includes(field)) {
                filteredFields[field] = updates[field]
            }
        }

        // Validar si hay campos válidos para actualizar
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }

        await Car.findByIdAndUpdate(id, filteredFields, { new: true })

        const response = await Car.findById(id).lean().select("-__v")

        return res.status(200).json({ msg: "Conferencista actualizado exitosamente", response })
    } catch (error) {

    }
}

const DeleteCar = async(req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Vehiculos"})
    }

    try {
        const deletedCar = await Car.findByIdAndDelete(id)
        if(!deletedCar){
            return res.status(400).json({msg: "El Vehiculo no existe"})
        }
        return res.status(200).json({msg: "Vehiculo eliminado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

export {
    RegisterCar,
    GetCar,
    GetCarById,
    UpdateCar,
    DeleteCar
}


