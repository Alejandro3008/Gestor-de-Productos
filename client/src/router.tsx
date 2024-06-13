import {createBrowserRouter} from 'react-router-dom'
import Layout from './layout/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityProduct} from './views/Products'
import NewProduct,{action as NewProductAction} from './views/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailabilityProduct
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: NewProductAction
            },
            {
                path: 'productos/:id/edit',
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])