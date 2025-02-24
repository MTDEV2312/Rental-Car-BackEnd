import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './routers/auth_routes.js'
import car from './routers/car_routes.js'



// Inicializaciones

const app = express();
dotenv.config();

// Configuraciones

app.set('port', process.env.PORT || 4000);
app.use(cors());

// Middlewares
app.use(express.json());


// Variables Globales

// Rutas

app.get('/',(req,res)=>{
    res.send('Server on 👨‍💻✅');
})


app.use('/api/',auth)

app.use('/api/',car)
/*
app.use('/api/',)
app.use('/api/',)
*/


//Rutas no encontradas

app.use((req,res)=>res.status(404).send("EndPoint no encontrado - 404 ❌"))

// Exportar la instancia de express por medio de app
export default  app;