import request  from "supertest";
import server from "../../server";

//* ---------- Pruebas para los endpoints POST ---------- *//
describe('POST /api/products',() => {
    test('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors). toHaveLength(7)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('should display a price error when is equal o less to 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo Testing",
            price: 0,
            quantity: 3,
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors). toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('should create a new product',async() => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo Testing",
            price: 2000,
            quantity: 3,
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })

})

//* ---------- Pruebas para los endpoints GET ALL ---------- *//
describe('GET /api/products', () => {
    test('check ir the url exist', async () => { 
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    test('get a json with all products', async() => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']). toMatch(/json/)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')

    })
})

//* ---------- Pruebas para los endpoints GET ---------- *//
describe('GET /api/products/:id', () => {
    test('should return a 404 error if the product not exist', async () => {
        const productID = 200
        const response = await request(server).get(`/api/products/${productID}`)
        expect(response.headers['content-type']). toMatch(/json/)
        expect(response.body).toHaveProperty('error')
        expect(response.status).toBe(404)
    })

    test('should check if the url is valid', async() => {
        const productID = 'hola'
        const response = await request(server).get(`/api/products/${productID}`)
        expect(response.headers['content-type']). toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(response.status).toBe(400)
    })

    test('get a JSON with information for a single product', async () => {
        const productID = 1
        const response = await request(server).get(`/api/products/${productID}`)
        expect(response.headers['content-type']). toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.status).toBe(200)
    })
})

//* ---------- Pruebas para los endpoints PUT ---------- *//
describe('PUT /api/products/:id', () => {
    test('should display validation error messages', async() => {
        const response = await request(server).put("/api/products/1").send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body).toBeTruthy()
    })

    test('should return a 404 response for a non-existing product', async() => {
        const response = await request(server).put("/api/products/100").send({
            name: "Mouse Logitech",
            price: 500,
            quantity: 3,
            availability: true
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body).toBeTruthy()
    })

    test('should display validation error message when the price is less or equal to 0', async() => {
        const response = await request(server).put("/api/products/1").send({
            name: "Mouse Logitech",
            price: -150,
            quantity: 3,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body).toBeTruthy()
    })

    test('Modify the product', async() => {
        const response = await request(server).put("/api/products/1").send({
            name: "Mouse Logitech",
            price: 500,
            quantity: 3,
            availability: true
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
    })

})

//* ---------- Pruebas para los endpoints PATCH ---------- *//
describe('PATCH /api/products/:id', () => {
    test('should modify the avalability of the product', async() => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
    })

    test('should return a 404 response for a non-existing product', async () => {
        const response = await request(server).patch('/api/products/10')
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
    })
})

//* ---------- Pruebas para los endpoints DELETE ---------- *//
describe('DELETE /api/products:id',() => {
    test('should check a valid id', async() => {
        const response = await request(server).delete("/api/products/not-valid")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    test('should check if the id exist', async() => {
        const response = await request(server).delete("/api/products/10")
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
    })

    test('should delete the product', async() => {
        const response = await request(server).delete("/api/products/1")
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
    })
})