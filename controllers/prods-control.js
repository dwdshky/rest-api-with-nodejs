const Products = require('../models/product-models');
const { getPostData } = require('../utils');

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'Product Not Found!' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Products.create(product);

    res.writeHead(201, {
      'Content-Type': 'application/json',
    });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

async function updateProducts(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'Product Not Found!' }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updProduct = await Products.update(id, productData);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeProducts(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'Product Not Found!' }));
    } else {
      await Products.remove(id);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: `Product ${id} Found!` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProducts,
  removeProducts,
};
