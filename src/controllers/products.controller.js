import db from '../db/connection.js'

export const getProducts = async (req, res, next) => {
  try {
    const products = await db('products').select('*');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { description, sku, price, stock_quantity, brand_id, status_id } = req.body;

    if (price <= 0 || stock_quantity < 0) {
      return res.status(400).json({ error: 'Invalid price or stock.' });
    }

    const [newProduct] = await db('products')
      .insert({ description, sku, price, stock_quantity, brand_id, status_id })
      .returning('*');

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};
