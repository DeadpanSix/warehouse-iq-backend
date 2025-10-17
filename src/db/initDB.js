import sequelize from './connection.js';
import './../models/index.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true }); // alter:true updates tables, use { force: true } to drop & recreate
    console.log('✅ Tables synchronized');
    process.exit(0);
  } catch (err) {
    console.error('❌ DB error:', err);
    process.exit(1);
  }
})();
