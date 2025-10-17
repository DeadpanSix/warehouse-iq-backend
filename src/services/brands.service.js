import ProductBrands from '../models/ProductBrands.js';

class BrandService {
  async getAllBrands() {
    return await ProductBrands.findAll();
  }

  async getBrandById(id) {
    return await ProductBrands.findByPk(id);
  }

  async createBrand(description) {
    return await ProductBrands.create({ description });
  }

  async updateBrandDescription(id, description) {
    const productBrand = await ProductBrands.findByPk(id);
    if (!productBrand) return null;

    productBrand.description = description;
    await productBrand.save();
    return productBrand;
  }
}

export default new BrandService();
