import {
  sequelize,
  ProductBrands,
  Status,
  ProductActionType
} from './../models/index.js';

const seedData = async () => {
  try {
    // alter:true updates tables, use { force: true } to drop & recreate
    await sequelize.sync({ force: true });
    console.log('Database synchronized (all tables dropped and recreated).');

    const brands = ['Nike', 'Adidas', 'Puma'].map((desc) => ({ description: desc }));
    await ProductBrands.bulkCreate(brands);
    console.log('ProductBrands seeded.');

    const statuses = [
      { description: 'Active' },
      { description: 'Inactive' },
    ];
    await Status.bulkCreate(statuses);
    console.log('Status seeded.');

    const actionTypes = [
      { description: 'Create' },
      { description: 'Update' },
      { description: 'Deactivate' },
      { description: 'PriceChange' },
    ];
    await ProductActionType.bulkCreate(actionTypes);
    console.log('ProductActionType seeded.');

    console.log('✅ Database initialization complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
  }
};

seedData();
