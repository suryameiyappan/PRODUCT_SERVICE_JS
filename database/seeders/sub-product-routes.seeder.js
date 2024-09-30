'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sub_product_routes', [
      { 
        product: 'JWTAUTH', 
        product_class: '../../modules/auth/jwt/JwtAuth', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'ChatBotAuth', 
        product_class: '../../modules/auth/chatbot-auth/ChatAuth', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'Articles', 
        product_class: '../../modules/blog/articles/Articles', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'ChatCmsService', 
        product_class: '../../modules/chat-bot-cms/cms-service/CmsService', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'ChatBotBoot', 
        product_class: '../../modules/chat-bot/boot/Boot', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'chatBotService', 
        product_class: '../../modules/chat-bot/service/ChatService', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'SLIC_LEAD_GEN', 
        product_class: '../../components/chat-bot-operations/bot-execute/SlicLeadGen', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'authEmail', 
        product_class: '../../components/email/auth-email/AuthEmail', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'BasicDetails', 
        product_class: '../../modules/user/basic-details/basic-details', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sub_product_routes', null, {});
  }
};