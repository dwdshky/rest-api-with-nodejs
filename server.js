const http = require('http');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProducts,
  removeProducts,
} = require('./controllers/prods-control');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    getProductById(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3];
    updateProducts(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    removeProducts(req, res, id);
  } else {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ msg: 'Not found!' }));
  }
});

PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
