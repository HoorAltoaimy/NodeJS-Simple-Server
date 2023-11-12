import fs from 'fs/promises'

const products = JSON.parse(await fs.readFile('products2.json', 'utf-8'))

const successResponse = (res, statusCode = 200, message = 'successful', payload = {}) => { //payload refers to the data we send (the name can be anything)
    res.status(statusCode).send({
      message, message,
      payload: payload
    })
}
  
const errorResponse = (res, statusCode = 500, message = 'Server Error') => {
    res.status(statusCode).send({message, message})
}

export const getAllProducts = async (req, res) => {
    try {
    const maxPrice = req.query.maxPrice
    if(maxPrice){
        const filteredProducts = products.filter((product) => product.price <= maxPrice)
        successResponse(res, 200, `Products with ${maxPrice} or less`, filteredProducts)
    }
    else{
        successResponse(res, 200, 'all product are rendered', products)
    }
    } catch (error) {
        errorResponse(res, 500, error.message)
    } 
}

export const createProduct = async (req, res) => {
    try {
        const {name, price} = body.req
        const newProduct = {
            id: new Date().getTime().toString(),
            name,
            price
        }
        const existingProducts = JSON.parse(await fs.readFile('products2.json', 'utf-8'))
        existingProducts.push(newProduct)
        await fs.writeFile('products2.json', JSON.stringify(existingProducts))
        successResponse(res, 201, 'New product is created', newProduct)
    } catch (error) {
        errorResponse(res, 500, error.message)
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = products.find((product) => product.id === id)
        if(product){
            successResponse(res, 200, 'single product is rendered', product)
        }
        else{
            errorResponse(res, 404, `no product found with this id ${id}`)
        }    
    } catch (error) {
        errorResponse(res, 500, error.message)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = products.find((product) => product.id === id)
        if(product){
            const filteredProducts = products.filter((product) => product.id !== id)
            await fs.writeFile('products2.json', JSON.stringify(filteredProducts))
            successResponse(res, 200, `Product ${id} is deleted`, filteredProducts)
        }
        else{
            errorResponse(res, 404, `no product found with this id ${id}`)
        }
    } catch (error) {
        errorResponse(res, 500, error.message)
    } 
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const index = products.findIndex((product) => product.id === id)
        const {name, price} = req.body
        if(index >= 0){
            if(name){
            products[index].name = name 
            }
            if(price){
                products[index].price = price 
            }
            await fs.writeFile('products2.json', JSON.stringify(products))
            successResponse(res, 200, `Product ${id} is updated`, products[index])
        }
        else{
            errorResponse(res, 404, `no product found with this id ${id}`)
        }
    } catch (error) {
        errorResponse(res, 500, error.message)
    }
}
