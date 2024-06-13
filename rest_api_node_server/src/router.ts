import { Router } from "express"
import { createProduct, getProducts,getProductByID, updateProduct, updateAvalability, deleteProduct } from "./handlers/Products"
import { body,param } from "express-validator" 
import { handlerInputErrors } from "./middleware"

const router = Router()

//* Schema Para el objecto de "Products"
/**
 * @swagger
 * components:
 *      schemas:
 *              Product:
 *                      type: object
 *                      properties: 
 *                              id:
 *                                      type: integer
 *                                      description: The Product ID
 *                                      example: 1
 *                              name: 
 *                                      type: string
 *                                      description: The product name
 *                                      example: Mouse
 *                              price:
 *                                      type: number
 *                                      description: The product price
 *                                      example: $100
 *                              quantity:
 *                                      type: number
 *                                      description: The product quantity
 *                                      example: 5
 *                              avalability:
 *                                      type: boolen
 *                                      description: The product avalability
 *                                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *              summary: Get a lis of products
 *              tags: 
 *                      - Products
 *              description: Return a lis of products
 *              responses: 
 *                      200: 
 *                              description: Succesfull response
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      type: array
 *                                                      items:
 *                                                              $ref: '#/components/schemas/Product'
 */
router.get('/',getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *              summary: Get a single of product
 *              tags: 
 *                      - Products
 *              description: Return a lis of products based on the unique ID
 *              parameters:
 *                    - in: path
 *                      name: ID
 *                      description: The id of the product
 *                      required: true
 *                      schema:
 *                              type: integer
 *              responses: 
 *                      200: 
 *                              description: Succesfull response
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      type: array
 *                                                      items:
 *                                                              $ref: '#/components/schemas/Product'
 *                      404: 
 *                              description: Not found
 *                      400: 
 *                              description: Bad request
 */
router.get('/:id',
        param('id').isInt().withMessage('ID no valido'),
        handlerInputErrors,
        getProductByID)

/**
 * @swagger
 * /api/products:
 *      post:
 *              summary: Create a new product
 *              tags:
 *                      - Products
 *              description: Returns a new record in the database
 *              requestBody:
 *                      required: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              type: object
 *                                              properties:
 *                                                      name:
 *                                                              type: string
 *                                                              example: "Mouse Logitech"
 *                                                      price:
 *                                                              type: number
 *                                                              example: 300
 *                                                      quantity:
 *                                                              type: number
 *                                                              example: 3
 *              responses:
 *                      201:
 *                              description: Product created successfully
 *                      400:
 *                              description: Bad Request - invalid input data
 */
router.post('/',
    //* ---------- Validacion desde el enrutador ----------
        body('name').notEmpty().withMessage('El nombre del producto no puede estar vacio'),
        body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom(value => value > 0).withMessage("EL precio no es valido"),
        body('quantity')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom(value => value > 0).withMessage("EL precio no es valido"),
    //* ---------- Ejecucion del middleware ----------
        handlerInputErrors,
    //* ---------- Ejecucion del handler ----------
        createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *              summary: Update a product with user input
 *              tags:
 *                      - Products
 *              description: Returns the updated product
 *              parameters:
 *                    - in: path
 *                      name: ID
 *                      description: The id of the product
 *                      required: true
 *                      schema:
 *                              type: integer
 *              requestBody:
 *                      required: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              type: object
 *                                              properties:
 *                                                      name:
 *                                                              type: string
 *                                                              example: "Mouse Logitech"
 *                                                      price:
 *                                                              type: number
 *                                                              example: 300
 *                                                      quantity:
 *                                                              type: number
 *                                                              example: 3
 *                                                      avalability:
 *                                                              type: boolean
 *                                                              example: true
 *              responses:
 *                      201:
 *                              description: Product created successfully
 *                      400:
 *                              description: Bad Request - invalid input data
 *                      404:
 *                              description: Not Found
 */
//* Para Modificar la totalidad del registro
router.put('/:id',
        param('id').isInt().withMessage('ID no valido'),
        body('name').notEmpty().withMessage('El nombre del producto no puede estar vacio'),
        body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom(value => value > 0).withMessage("EL precio no es valido"),
        body('quantity')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom(value => value > 0).withMessage("EL precio no es valido"),
        body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
        handlerInputErrors,
        updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *              summary: Update Product avalability
 *              tags: 
 *                      - Products
 *              description: Returns the updated avalability
 *              parameters:
 *                    - in: path
 *                      name: ID
 *                      description: The id of the product
 *                      required: true
 *                      schema:
 *                              type: integer
 *              responses:
 *                      201:
 *                              description: Product created successfully
 *                      400:
 *                              description: Bad Request - invalid input data
 *                      404:
 *                              description: Not Found
 */
router.patch('/:id',
        param('id').isInt().withMessage('ID no valido'),
        handlerInputErrors,
        updateAvalability
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *              summary: Delete a single product
 *              tags: 
 *                      - Products
 *              description: Returns a message of succesfull result
 *              parameters:
 *                    - in: path
 *                      name: ID
 *                      description: The id of the product
 *                      required: true
 *                      schema:
 *                              type: integer
 *              responses:
 *                      201:
 *                              description: Product created successfully
 *                      404:
 *                              description: Not Found
 */
router.delete('/:id',
        param('id').isInt().withMessage('ID no valido'),
        handlerInputErrors,
        deleteProduct
)


export default router
