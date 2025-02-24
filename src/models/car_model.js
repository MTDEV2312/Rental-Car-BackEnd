import {Schema,model} from 'mongoose'

const CarSchema = new Schema({
    placa:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    marca:{
        type:String,
        trim:true,
        required:true
    },
    modelo:{
        type:String,
        trim:true,
        required:true
    },
    tipo_vehiculo:{
        type:String,
        trim:true,
        required:true
    },
    color:{
        type:String,
        trim:true,
        required:true
    },
    anio_fabricacion:{
        type:Date,
        trim:true,
        required:true
    },
    kilometraje:{
        type:Number,
        trim:true,
        required:true,
        min:0
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true
})

export default model("Cars",CarSchema)