import Client from '../models/client_model.js'

const RegisterClient = async (req, res) => {
    try {
        const { cedula, email } = req.body

        const ClientID = await Client.findOne({ cedula: cedula })
        if (ClientID) { return res.status(400).json({ msg: "La cedula ya se encuentra registrada" }) }
        const ClientEmail = await Client.findOne({ email: email })
        if (ClientEmail === email) { return res.status(400).json({ msg: "El email ya se encuentra registrado" }) }
        const newClient = new Client(req.body)
        newClient.save()
        res.status(201).json({ msg: "Cliente registrado Correctamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

const GetClients = async (req, res) => {
    try {
        const clientBDD = await Client.find()
        const response = clientBDD.map(client => ({
            _id: client.id,
            cedula: client.cedula,
            nombre: client.nombre,
            apellido: client.apellido,
            email: client.email,
            ciudad: client.ciudad,
            direccion: client.direccion,
            telefono: client.telefono,
            fecha_nacimiento: client.fecha_nacimiento
        }))

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

const GetClientById = async (req, res) => {
    try {
        const { cedula } = req.params
        if (!cedula) { return res.status(400).json({ msg: "Se necesita ingresar una cedula" }) }

        const clientBDD = await Client.findOne({ cedula: cedula })
        if (!clientBDD) { return res.status(400).json({ msg: "Cliente no registrado" }) }

        const response = {
            _id: clientBDD.id,
            cedula: clientBDD.cedula,
            nombre: clientBDD.nombre,
            apellido: clientBDD.apellido,
            email: clientBDD.email,
            ciudad: clientBDD.ciudad,
            direccion: clientBDD.direccion,
            telefono: clientBDD.telefono,
            fecha_nacimiento: clientBDD.fecha_nacimiento
        }

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

const UpdateClient = async (req, res) => {
    const { id } = req.params
    const { ...updates } = req.body
    if (!id) { return res.status(400).json({ msg: "Lo sentimos, debes proporcionar un id" }) }
    try {
        // Obtener los datos del tecnico a actualizar
        const validFields = ['nombre', 'apellido', 'email', 'ciudad', 'direccion', 'telefono']
        const filteredFields = {}

        const clientBDD = await Client.findOne({ email: updates.email })
        if (clientBDD) { return res.status(400).json({ msg: "Correo ya registrado" }) }

        for (const field in updates) {
            if (validFields.includes(field)) {
                filteredFields[field] = updates[field]
            }
        }

        // Validar si hay campos válidos para actualizar
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }

        await Client.findByIdAndUpdate(id, filteredFields, { new: true })

        const response = await Client.findById(id).lean().select("-__v")

        return res.status(200).json({ msg: "Conferencista actualizado exitosamente", response })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

const DeleteClient = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ msg: "Lo sentimos, debes proporcionar un id de Clientes" })
    }

    try {
        const deletedClient = await Client.findByIdAndDelete(id)
        if (!deletedClient) {
            return res.status(400).json({ msg: "El Cliente no existe" })
        }
        return res.status(200).json({ msg: "Cliente eliminado exitosamente" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Lo sentimos, algo salio mal" })
    }
}

export {
    RegisterClient,
    GetClients,
    GetClientById,
    UpdateClient,
    DeleteClient
}