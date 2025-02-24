import {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    apellido:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true
})

//* Metodos

UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10)
    const passwordEncrypted = await bcrypt.hash(password,salt)
    return passwordEncrypted
}

UserSchema.methods.ValidatePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

export default model("User",UserSchema)