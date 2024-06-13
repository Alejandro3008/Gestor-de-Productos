import {Request,Response} from 'express'
import Product from '../models/Product.model'

export const getProducts = async(req:Request,res:Response) => {
    
    //* Traer todos los elementos con el order seleccionado
    //const products = await Product.findAll({
    // order:[
    //    ['price': 'DESC']
    //]
    //})
    const products = await Product.findAll({
        attributes: {exclude:["createdAt","updatedAt"]}
    })
    res.status(200).json({data:products})

}

export const getProductByID = async(req:Request,res:Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    res.status(200).json({data:product})
}

export const createProduct = async (req:Request,res:Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const updateProduct = async (req:Request,res:Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({error: 'Producto no encontrado'})
    }else{
        //*Actualizar
        await product.update(req.body)
        await product.save()    
        res.status(201).json({data:product})
    }
}

export const updateAvalability = async (req:Request,res:Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: 'Producto no encontrado'})
    }else{
        //*Actualizar
        product.availability = !product.dataValues.availability
        await product.save()
        res.status(201).json({data:product})
    }
}

export const deleteProduct = async (req:Request,res:Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: 'Producto no encontrado'})
    }
    //* Eliminar
    await product.destroy()
    res.status(200).json({data:'Producto Eliminado'})
}