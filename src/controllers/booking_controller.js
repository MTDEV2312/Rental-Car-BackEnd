import Booking from '../models/booking_model.js'
import Car from '../models/car_model.js'
import Client from '../models/client_model.js'

const RegisterBooking = async(req,res) => {
    try {
        const {codigo,cliente,vehiculo} = req.body
    
        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        const bookingBDD = await Booking.findOne({codigo:codigo})
        if(bookingBDD){return res.status(400).json({msg:"El codigo ya se encuentra registrado"})}

        const CarBDD = await Car.findOne({placa:vehiculo})
        if(!CarBDD){return res.status(400).json({msg:"El vehiculo no esta registrado"})}

        const ClientBDD = await Client.findOne({cedula:cliente})
        if(!ClientBDD){return res.status(400).json({msg:"El Cliente no esta registrado"})}
        
        const newBooking = new Booking(req.body)
        await newBooking.save()
        return res.status(201).json({msg:"Reserva registrada Correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json("Lo sentimos, algo salio mal")
    }
}

const GetBooking = async(req,res) => {
    try {
        const BookingBDD = await Booking.find()
        const ClientID = [... new Set(BookingBDD.map(booking => booking.cliente))]
        const CarCode = [... new Set(BookingBDD.map(booking => booking.vehiculo))]

        const CarBDD = await Car.find({placa:{$in:CarCode}})
        const ClientBDD = await Client.find({cedula:{$in:ClientID}})

        const CarMap = CarBDD.reduce((map,car)=>{
            map[car.placa]={
                _id: car.id,
                placa: car.placa,
                marca: car.marca,
                modelo: car.modelo,
                tipo_vehiculo: car.tipo_vehiculo,
                color: car.color,
                anio_fabricacion: car.anio_fabricacion,
                kilometraje: car.kilometraje,
                descripcion: car.descripcion
            }
            return map
        },{})

        const ClientMap = ClientBDD.reduce((map,client)=>{
            map[client.cedula]={
                _id: client.id,
                cedula: client.cedula,
                nombre: client.nombre,
                apellido: client.apellido,
                email: client.email,
                ciudad: client.ciudad,
                direccion: client.direccion,
                telefono: client.telefono,
                fecha_nacimiento: client.fecha_nacimiento
            }
            return map
        },{})
    
        const response = BookingBDD.map(booking => ({
            _id: booking.id,
            codigo: booking.codigo,
            descripcion:booking.descripcion,
            vehiculo: CarMap[booking.vehiculo] || null,
            cliente: ClientMap[booking.cliente] || null
        }))
    
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Lo sentimos, algo salio mal'})
    }
}

const GetBookingById = async (req,res) => {
    try {
        const {codigo}=req.params

        if(!codigo){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un codigo"})
        }

        const BookingBDD = await Booking.findOne({codigo:codigo})

        if(!BookingBDD){
            return res.status(400).json({msg: "Lo sentimos, la reserva no existe"})
        }

        const CarID = BookingBDD.vehiculo
        const ClientID = BookingBDD.cliente
        const CarBDD = await Car.findOne({placa:CarID})
        const ClientBDD = await Client.findOne({cedula:ClientID})

        const CarDetails = CarBDD ?{
            _id: CarBDD.id,
            placa: CarBDD.placa,
            marca: CarBDD.marca,
            modelo: CarBDD.modelo,
            tipo_vehiculo: CarBDD.tipo_vehiculo,
            color: CarBDD.color,
            anio_fabricacion: CarBDD.anio_fabricacion,
            kilometraje: CarBDD.kilometraje,
            descripcion: CarBDD.descripcion
        }:null

        const ClientDetails = ClientBDD ?{
            _id: ClientBDD.id,
            cedula: ClientBDD.cedula,
            nombre: ClientBDD.nombre,
            apellido: ClientBDD.apellido,
            email: ClientBDD.email,
            ciudad: ClientBDD.ciudad,
            direccion: ClientBDD.direccion,
            telefono: ClientBDD.telefono,
            fecha_nacimiento: ClientBDD.fecha_nacimiento
        }:null

        const BookingDetail = {
            _id: BookingBDD.id,
            codigo: BookingBDD.codigo,
            descripcion:BookingBDD.descripcion,
            vehiculo: CarDetails,
            cliente: ClientDetails
        }
        return res.status(200).json(BookingDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const UpdateBooking = async (req,res) => {
    try {
        const {id} = req.params
        const updates = req.body
    
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        const carBDD = await Car.findOne({placa:updates.vehiculo})
        
        if(!carBDD){return res.status(400).json({msg:"Vehiculo no registrado"})}
        const validFields = ['descripcion','vehiculo']
        const filteredFields = {}

        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
    
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }
    
        await Booking.findByIdAndUpdate(id,filteredFields,{new:true})
    
        const response = await Booking.findById(id).lean().select("-__v")
        res.status(200).json({msg:"Reserva actualizada",response})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
    }
}

const DeleteBooking = async(req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Citas"})
    }

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id)
        if(!deletedBooking){
            return res.status(400).json({msg: "Reserva no registrada"})
        }
        return res.status(200).json({msg: "Reserva eliminada exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

export{
    RegisterBooking,
    GetBooking,
    GetBookingById,
    UpdateBooking,
    DeleteBooking
}

