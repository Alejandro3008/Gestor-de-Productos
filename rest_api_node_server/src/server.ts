import express from 'express'
import colors from 'colors'//* Extension para mostrar de diferentes color los mensajes de la consola
import morgan from 'morgan'
import cors, {CorsOptions} from 'cors'
import swaggerUi, { serve } from 'swagger-ui-express'
import swaggerSpec, {swaggerUIOptions} from './config/swagger'
import router from './router'
import db from './config/db'

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log('Conectada')
    } catch (error) {
        console.log(colors.bgRed.white("Hubo un error al conectar"))
        //console.log(error)
    }
}

connectDB()
//* Instancia de express
const server = express()

// Permitir conexiones
/**const corsOptions:CorsOptions = {
    origin: function(origin,callback){
        console.log(origin)
    }
}**/
//server.use(cors(corsOptions))

server.use(cors())

//* Leer datos de formulario
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products',router)

//* Endpoint para pruebas de conexion en Jest
/*server.get('/api', (req,res) => {
    res.json({msg:'Desde API'})
})*/

//* Documentacion
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUIOptions))

export default server