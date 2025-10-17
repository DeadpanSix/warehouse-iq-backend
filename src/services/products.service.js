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
    const { description, sku, price, stock_quantity, status_id, brand_id } = data;

    if (price <= 0) throw new Error('Price must be higher than 0');
    if (stock_quantity < 0) throw new Error('Stock quantity cannot be negative');

    const existingProduct = await Product.findOne({ where: { sku } });
    if (existingProduct) throw new Error('SKU must be unique');

    if (status_id) {
      const status = await Status.findByPk(status_id);
      if (!status) throw new Error('Invalid status_id');
    }

    if (!brand_id) {
      const activeBrand = await Brand.findOne({ where: { description: 'Active' } });
      if (!activeBrand) throw new Error('No brand with description "Active" found');
      brand_id = activeBrand.id;
    }

    const newProduct = await Product.create({
      description,
      sku,
      price,
      stock_quantity,
      status_id: status_id,
      brand_id: brand_id || null,
    });

    return await Product.findByPk(newProduct.id, {
      attributes: ['id', 'description', 'sku', 'price', 'stock_quantity'],
      include: [
        { model: Status, as: 'status', attributes: ['description'], required: false },
        { model: Brand, as: 'brand', attributes: ['description'], required: false },
      ],
    });
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
    // wrong
    const inactiveStatus = await Status.findOne({
      where: { description: 'Inactive' }
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
