import Product from '../models/Products.js';
import Status from '../models/Status.js';
import Brand from '../models/ProductBrands.js';

class ProductsService {
  async getAllProducts() {
    return await Product.findAll({
      attributes: ['id', 'description', 'sku', 'price', 'stock_quantity'],
      include: [
        {
          model: Status,
          as: 'status',
          attributes: ['description'],
          where: { entity: 'products' },
          required: false
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['description'],
          required: false
        }
      ]
    });
  }

  async getProductById(id) {
    const product = await Product.findOne({
      where: { id },
      attributes: ['id', 'description', 'sku', 'price', 'stock_quantity'],
      include: [
        {
          model: Status,
          as: 'status',
          attributes: ['description'],
          required: false
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['description'],
          required: false
        }
      ]
    });

    return product || null;
  }

  async createProduct(data) {
    const { description, sku, price, stock_quantity, brand_id } = data;

    const statusActivo = await Status.findOne({
      where: { entity: 'products', description: 'Active' }
    });

    if (!statusActivo) {
      throw new Error('Active status not found for products');
    }

    const newProduct = await Product.create({
      description,
      sku,
      price,
      stock_quantity,
      brand_id,
      status_id: statusActivo.id
    });

    return newProduct;
  }

  async updateProduct(id, data) {
    const [affectedRows] = await Product.update(data, {
      where: { id },
      returning: true
    });

    if (!affectedRows) return null;
    return await Product.findByPk(id);
  }

  async deactivateProduct(id) {
    const inactiveStatus = await Status.findOne({
      where: { entity: 'products', description: 'Inactive' }
    });

    if (!inactiveStatus) {
      throw new Error('Inactive status not found for products');
    }

    const [affectedRows] = await Product.update(
      { status_id: inactiveStatus.id },
      { where: { id }, returning: true }
    );

    if (!affectedRows) return null;
    return await Product.findByPk(id);
  }
}

export default new ProductsService();
