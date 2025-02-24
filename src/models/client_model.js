import {Schema, model} from 'mongoose'

const ClientSchema = new Schema({
    cedula:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    nombre:{
        type: String,
        trim:true,
        required:true
    },
    apellido:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    ciudad:{
        type:String,
        trim:true,
        required:true
    },
    direccion:{
        type:String,
        trim:true,
        required:true
    },
    telefono:{
        type:String,
        trim:true,
        required:true
    },
    fecha_nacimiento:{
        type:Date,
        trim:true,
        required:true
    }
})

export default model('Clients',ClientSchema)