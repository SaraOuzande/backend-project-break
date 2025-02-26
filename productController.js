const Product = require('../models/Product');

// Función para mostrar todos los productos
const showProducts = async (req, res) => {
  try {
    const products = await Product.find();
    let html = baseHtml + getNavBar();
    html += getProductCards(products);  // Generar los productos
    res.send(html);
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
};

// Función para mostrar el detalle de un producto
const showProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    let html = baseHtml + getNavBar();
    html += getProductDetail(product);
    res.send(html);
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
};

// Función para mostrar el formulario para agregar un nuevo producto
const showNewProduct = (req, res) => {
  let html = baseHtml + getNavBar();
  html += getNewProductForm();  // Generar formulario para nuevo producto
  res.send(html);
};

// Función para crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, description, image, category, size, price } = req.body;
  const newProduct = new Product({ name, description, image, category, size, price });
  try {
    await newProduct.save();
    res.redirect('/products');  // Redirigir a la lista de productos
  } catch (error) {
    res.status(500).send("Error al crear el producto");
  }
};

// Función para mostrar el formulario de edición de producto
const showEditProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    let html = baseHtml + getNavBar();
    html += getEditProductForm(product);
    res.send(html);
  } catch (error) {
    res.status(500).send("Error al obtener el producto para editar");
  }
};

// Función para actualizar un producto
const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, description, image, category, size, price } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(productId, { name, description, image, category, size, price }, { new: true });
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    res.redirect(`/products/${productId}`);  // Redirigir al detalle del producto
  } catch (error) {
    res.status(500).send("Error al actualizar el producto");
  }
};

// Función para eliminar un producto
const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await Product.findByIdAndDelete(productId);
    res.redirect('/products');  // Redirigir a la lista de productos
  } catch (error) {
    res.status(500).send("Error al eliminar el producto");
  }
};

module.exports = {
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct,
};
