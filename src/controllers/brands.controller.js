import db from '../db/connection.js';

export const getBrands = async (req, res, next) => {
  try {
    const brands = await db('brands').select('*');

    if (brands.length === 0) {
      return res.status(200).json({ message: 'No brands found', data: [] });
    }

    res.status(200).json({ data: brands });
  } catch (err) {
    if (err.code === '42P01') { // table does not exist
      return res.status(500).json({ error: 'Brands table does not exist' });
    }
    next(err);
  }
};

export const addBrand = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description || description.length > 10) {
      return res
        .status(400)
        .json({ error: 'Description is required and must be ≤ 10 characters.' });
    }

    const [newBrand] = await db('brands')
      .insert({ description })
      .returning('*');

    res.status(201).json(newBrand);
  } catch (err) {
    // Handle duplicate description (unique constraint)
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Brand already exists.' });
    }
    next(err);
  }
};

export const getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await db('brands').where({ id }).first();

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found.' });
    }

    res.json(brand);
  } catch (err) {
    next(err);
  }
};

export const updateBrandDescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required '});
    } else if (description.length > 10) {
      return res.status(400).json({ error:'Description is longer than 10 characters' });
    }

    const updated = await db('brands')
      .where({ id })
      .update({ description })
      .returning('*');

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Brand not found'});
    }

    res.status(200).json({ message: 'Brand updated successfully', data: updated[0] });
  } catch (err) {
    next(err);
  }
};
