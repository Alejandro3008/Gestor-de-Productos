import request  from "supertest";
import {connectDB} from "../server";
import db from "../config/db";

//* Test para prueba de conexion hacia la base de datos
/*describe('GET/api', () => { 
    test('should sent back a json response', async() => {
        const res = await request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']). toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})*/


jest.mock("../config/db")

describe('connectDB',() => {
    test('should handle db connection errror',async () => {
        jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar'))
        const consoleSpy = jest.spyOn(console,'log')
        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectar'))
    })
})