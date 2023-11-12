import {Router} from 'express'

import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productsContoller.js'

const productsRouter = Router()

productsRouter.get('/products', getAllProducts)

productsRouter.post('/products', createProduct)

productsRouter.get('/products/:id', getSingleProduct)

productsRouter.delete('/products/:id', deleteProduct)

productsRouter.put('/products/:id', updateProduct)

export default productsRouter
