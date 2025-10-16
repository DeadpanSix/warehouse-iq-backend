import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct as serviceUpdateProduct,
  deactivateProduct as serviceDeactivateProduct
} from "../services/products.service.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await serviceUpdateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deactivateProduct = async (req, res, next) => {
  try {
    const deactivated = await serviceDeactivateProduct(req.params.id);
    if (!deactivated) {
      return res.status(404).json({ message: 'Producto no encontrado o ya inactivo' });
    }
    res.status(200).json({ message: 'Producto dado de baja correctamente' });
  } catch (err) {
    next(err);
  }
};
