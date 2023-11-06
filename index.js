import http from 'http'

const PORT = '8080'

let products = [
  {
    "id": 1,
    "name": "Laptop",
    "image": "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg",
    "description": "High-performance laptop for all your needs.",
    "categories": [1, 2],
    "variants": ["8GB RAM", "16GB RAM"],
    "sizes": ["13-inch", "15-inch"]
  },
  {
    "id": 2,
    "name": "Smartphone",
    "image": "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
    "description": "Latest smartphone with advanced features.",
    "categories": [1, 3],
    "variants": ["64GB", "128GB"],
    "sizes": []
  }
]

const server = http.createServer((req, res) => {
  if(req.url === '/' && req.method === 'GET'){
    res.writeHead(200, {'Content-Type': 'text/html'}) //to specify the data that will be returned (plain, html, or json)
    res.write('<h1> Hello, World! </h1>')
    res.end()
  }
  else if(req.url === '/products' && req.method === 'GET'){
    res.writeHead(200, {'Content-Type': 'application/json'}) 
    res.write(JSON.stringify(products))
    res.end()
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})
