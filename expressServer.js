//Crearing a simple server using express.js

import express from 'express'
import morgan from 'morgan'

import productsRouter from './express/routes/productsRoutes.js'

const app = express()
const PORT = '8080'

app.use(morgan('dev')) //consol logs the http request and the endpoint and the status code
app.use(express.json()) //to handle the json data sent from the body (from the frontend)
app.use(express.urlencoded({extended: false})) //to handle the form data sent from the body
app.use(productsRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('New data is received')
})

app.listen(PORT, () => {
    console.log(`server is runing at: http://127.0.0.1:${PORT}`)
})
