import Product from "../Model/product.model.js";
//Function to get all products
export async function getAllProducts(req, res) {
  try {
    let products = await Product.find({});
    if (products.length == 0) {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      await Product.insertMany(data.products);
      products = await Product.find({});
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// Function to get Products by Id
export async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `No Product With Id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
