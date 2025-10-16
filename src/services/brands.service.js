import db from '../db/connection.js';

export const getAllBrands = async () => {
  const brands = await db('brands').select('*');
  return brands;
};

export const getBrandById = async (id) => {
  const brand = await db('brands').where({ id }).first();
  return brand;
};

export const createBrand = async (description) => {
  const [newBrand] = await db('brands')
    .insert({ description })
    .returning('*');
  return newBrand;
};

export const updateBrandDescription = async (id, description) => {
  const updated = await db('brands')
    .where({ id })
    .update({ description })
    .returning('*');
  return updated[0];
};
