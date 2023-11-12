import {Router} from 'express'

import { createProductValidation } from '../middleware/productsInputValidation.js'
import { runValidation } from '../middleware/runValidation.js'

import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productsContoller.js'

const productsRouter = Router()

productsRouter.get('/products', getAllProducts)

productsRouter.post('/products', createProductValidation, runValidation, createProduct)

productsRouter.get('/products/:id', getSingleProduct)

productsRouter.delete('/products/:id', deleteProduct)

productsRouter.put('/products/:id', createProductValidation, runValidation, updateProduct)

export default productsRouter
