//Crearing a simple server

import http from 'http'
import fs from 'fs/promises'
import {parse} from 'querystring' //use it to convert the data into understandable format
import { v4 as uuidv4 } from 'uuid'

const PORT = '8080'

const products = JSON.parse(await fs.readFile('products.json', 'utf-8'))

const successResponse = (res, statusCode = 200, message = 'successful', payload = {}) => { //payload refers to the data we send (the name can be anything)
  res.writeHead(statusCode, {'Content-Type': 'application/json'}) 
  res.write(JSON.stringify({
    message, message,
    payload: payload
  }))
  res.end()
}

const errorResponse = (res, statusCode = 500, message = 'Server Error') => {
  res.writeHead(statusCode, {'Content-Type': 'application/json'}) 
  res.write(JSON.stringify({message, message}))
  res.end()
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if(req.url === '/' && req.method === 'GET'){
    try {
      successResponse(res, 200, 'Hello World!')
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  }
  else if(req.url === '/' && req.method === 'POST'){
    try {
      let body = ''

      req.on('data', (chunk) => {
        body = body + chunk
      }) //chunk is the seprated data (name, price...) the name can be anything
      
      req.on('end', () => {
        const data = parse(body)
        console.log(data)
        successResponse(res, 201, 'New data is received')
      })

    } catch (error) {
      errorResponse(res, 500, error.message)
    } 
  }
  else if(req.url === '/products' && req.method === 'GET'){
    try {
      // const products = JSON.parse(await fs.readFile('products.json', 'utf-8'))
      successResponse(res, 200, 'Render all products', products)
    } catch (error) {
      errorResponse(res, 500, error.message)
    } 
  }
  else if(req.url === '/products' && req.method === 'POST'){
    try {
      let body = ''

      req.on('data', (chunk) => {
        body = body + chunk
      }) 
      
      req.on('end', async () => {
        const data = parse(body)
        const newProduct = {
          id: uuidv4(),
          name: String(data.name),
          price: Number(data.price)
        }
        // const existingProducts = JSON.parse(await fs.readFile('products.json', 'utf-8'))
        products.push(newProduct)
        await fs.writeFile('products.json', JSON.stringify(products))
        successResponse(res, 201, 'New product is created')
      })

    } catch (error) {
      errorResponse(res, 500, error.message)
    } 
  }
  else {
    errorResponse(res, 500, 'Route is not found')
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})
