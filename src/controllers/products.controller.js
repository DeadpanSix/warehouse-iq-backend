import ProductsService from '../services/products.service.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductsService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await ProductsService.getProductById(req.params.id);

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
    const { description, sku, price, stock_quantity, status_id, brand_id } = req.body;

    const missingFields = [];
    if (!description) missingFields.push('description');
    if (!sku) missingFields.push('sku');
    if (price == null) missingFields.push('price');
    if (stock_quantity == null) missingFields.push('stock_quantity');
    if (!status_id) missingFields.push('status_id');
    if (!brand_id) missingFields.push('brand_id');

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const product = await ProductsService.createProduct({
      description,
      sku,
      price,
      stock_quantity,
      status_id,
      brand_id,
    });

    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await ProductsService.updateProduct(req.params.id, req.body);

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
    const deactivated = await ProductsService.deactivateProduct(req.params.id);

    if (!deactivated) {
      return res.status(404).json({ message: 'Producto no encontrado o ya inactivo' });
    }

    res.status(200).json({ message: 'Producto dado de baja correctamente' });
  } catch (err) {
    next(err);
  }
};
