import {Schema,model} from 'mongoose'

const BookingSchema = new Schema({
    codigo:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    },
    cliente:{
        type:String,
        trim:true,
        required:true,
        ref:'Clients'
    },
    vehiculo:{
        type:String,
        trim:true,
        required:true,
        ref:'Cars'
    }
})

export default model('Bookings',BookingSchema)