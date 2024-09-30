'use strict';

const 
  sequelize = require('../../models'),
  userSeeder = require('./user.seeder'),
  productRoutesSeeder = require('./product-routes.seeder'),
  subProductRoutesSeeder = require('./sub-product-routes.seeder');

const seedDatabase = async () => {
  try {
      await Promise.all([
        userSeeder(),
        productRoutesSeeder(),
        subProductRoutesSeeder()
      ]);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
