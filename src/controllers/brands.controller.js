import BrandService from '../services/brands.service.js';

export const getBrands = async (req, res, next) => {
  try {
    const brands = await BrandService.getAllBrands();

    if (!brands || brands.length === 0) {
      return res.status(200).json({ message: 'No brands found', data: [] });
    }

    res.status(200).json({ data: brands });
  } catch (err) {
    if (err.original?.code === '42P01') {
      return res.status(500).json({ error: 'Brands table does not exist' });
    }
    next(err);
  }
};

export const getBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await BrandService.getBrandById(id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found.' });
    }

    res.status(200).json(brand);
  } catch (err) {
    next(err);
  }
};

export const newBrand = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description || description.length > 10) {
      return res.status(400).json({
        error: 'Description is required and must be ≤ 10 characters.'
      });
    }

    const newBrand = await BrandService.createBrand(description);
    res.status(201).json(newBrand);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Brand already exists.' });
    }
    next(err);
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    } else if (description.length > 10) {
      return res
        .status(400)
        .json({ error: 'Description is longer than 10 characters' });
    }

    const updatedBrand = await BrandService.updateBrandDescription(id, description);

    if (!updatedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res
      .status(200)
      .json({ message: 'Brand updated successfully', data: updatedBrand });
  } catch (err) {
    next(err);
  }
};
