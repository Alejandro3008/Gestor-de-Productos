import { safeParse } from "valibot"
import axios from 'axios'
import { Product, ProductSchema, ProductsSchema, draftProductSchema } from "../types"
import { toBoolean } from "../utils/indedx"
type ProductData = {
    [k: string]: FormDataEntryValue
}
export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(draftProductSchema,{
            name: data.name,
            price: +data.price,
            quantity: +data.quantity
        })

        if(result.success){
            const url = `${import.meta.env.VITE_API_URL }/api/products/`
            await axios.post(url,{
                name: result.output.name,
                price: result.output.price,
                quantity: result.output.quantity
            })
        }else{
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL }/api/products/`
        const {data} = await axios.get(url)
        const result = safeParse(ProductsSchema,data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error')
        }
    } catch (error) {
        throw new Error('No hay datos')
    }
}

export async function getProductByID(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL }/api/products/${id}`
        const {data} = await axios.get(url)
        const result = safeParse(ProductSchema,data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error')
        }
    } catch (error) {
        throw new Error('No hay datos')
    }
}

export async function editProduct(data: ProductData, id: Product['id']) {

    try {
        const result = safeParse(ProductSchema,{
            id,
            name: data.name,
            price: +data.price,
            quantity: +data.quantity,
            availability: toBoolean(data.availability.toString())
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL }/api/products/${id}`
            await axios.put(url, result.output)
        }else{
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL }/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function upadteProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL }/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}