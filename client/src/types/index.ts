import { number, string ,object, boolean, InferOutput, array } from "valibot";

export const draftProductSchema = object({
    name: string(),
    price: number(),
    quantity: number()

})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    quantity: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>
export type Products = InferOutput<typeof ProductsSchema>