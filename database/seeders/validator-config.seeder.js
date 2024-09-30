'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('validator_config', [
      { product: 'AUTH_SERVICE', 
        product_class: '../../services/validators/auth.validation', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'PRODUCT_SERVICE', 
        product_class: '../../services/validators/product.validation', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'JWTAUTH', 
        product_class: '../../modules/auth/validations/jwt.validation', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('validator_config', null, {});
  }
};