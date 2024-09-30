'use strict';

const 
  bcrypt = require("bcrypt"),
  commonUtils = require('../../utils/common.helper');
  
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { 
        username: 'joker',
        password: bcrypt.hashSync('joker@123$', 10),
        email: 'joker.psa@gmail.com', 
        phone_number: '9943098715',
        verify_token: commonUtils.generateToken(53),
        is_verified: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};