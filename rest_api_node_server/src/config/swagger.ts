import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options :swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name:'Products',
                description: 'API Operations related to products'
            }
        ],
        info:{
            title:"REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API Doc for products"
        }
    }, apis:['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
const swaggerUIOptions: SwaggerUiOptions = {
    customCss: `.topbar-wrapper .link{
        content: url('');
        height: 120px;
        width: auto;
    }`
}
export default swaggerSpec
export {swaggerUIOptions}