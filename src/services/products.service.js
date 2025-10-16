import db from '../db/connection.js';

export const getAllProducts = async () => {
  return await db('products as p')
    .leftJoin('status as e', 'p.status_id', 'e.id')
    .leftJoin('brands as m', 'p.brand_id', 'm.id')
    .select(
      'p.id',
      'p.description',
      'p.sku',
      'p.price',
      'p.stock_quantity',
      'e.description as status',
      'm.description as brand'
    )
    .where('e.entity', '=', 'products');
};

export const getProductById = async (id) => {
  const product = await db('products as p')
    .leftJoin('status as e', 'p.status_id', 'e.id')
    .leftJoin('brands as m', 'p.brand_id', 'm.id')
    .select(
      'p.id',
      'p.description',
      'p.sku',
      'p.price',
      'p.stock_quantity',
      'e.description as status',
      'm.description as brand'
    )
    .where('p.id', id)
    .first();

  return product || null;
};

export const createProduct = async (data) => {
  const { description, sku, price, stock_quantity, brand_id } = data;

  const statusActivo = await db('status')
    .where({ entity: 'products', description: 'Active' })
    .first();

  const [newProduct] = await db('products')
    .insert({
      description,
      sku,
      price,
      stock_quantity,
      brand_id,
      status_id: statusActivo.id
    })
    .returning('*');

  return newProduct;
};

export const updateProduct = async (id, data) => {
  const [updated] = await db('products')
    .where({ id })
    .update(data)
    .returning('*');

  return updated || null;
};

export const deactivateProduct = async (id) => {
  const [updated] = await db('products')
    .where({ id })
    .update({ status_id: 2 })
    .returning('*');

  return updated || null;
};
