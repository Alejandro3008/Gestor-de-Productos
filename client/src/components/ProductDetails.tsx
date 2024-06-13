/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils/indedx"
import { deleteProduct } from "../services/ProductServices"

type ProductDetailsProps = {
    product: Product
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({params}:ActionFunctionArgs) {
    if(params.id !== undefined){
        await deleteProduct(+params.id)
    }
    return redirect('/')
}

export default function ProductDetails({product}:ProductDetailsProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800 text-center">{product.name}</td>
            <td className="p-3 text-lg text-gray-800 text-center">{formatCurrency(product.price)}</td>
            <td className="p-3 text-lg text-gray-800 text-center">{product.quantity}</td>
            <td className="p-3 text-lg text-gray-800 text-center">
                <fetcher.Form method='POST'>
                    <button type="submit" name="id" value={product.id} className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}>
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={() => navigate(`productos/${product.id}/edit`)} 
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs">Editar</button>
                    <Form className="w-full" method="POST" action={`productos/${product.id}/delete`} onSubmit={(e) => {
                        if(!confirm('¿Eliminar?')){
                            e.preventDefault()
                        }
                    }}>
                        <input type="submit" value='Eliminar' className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"/>
                    </Form>
                </div>
            </td>
        </tr> 
    )
}




