'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_routes', [
      { 
        product: 'Auth', 
        product_class: '../../modules/auth/Auth', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'Blog', 
        product_class: '../../modules/blog/Blog', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'User', 
        product_class: '../../modules/user/User', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'ChatBot', 
        product_class: '../../modules/chat-bot/ChatBot', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'ChatBotCms', 
        product_class: '../../modules/chat-bot-cms/ChatBotCms', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'EMAIL', 
        product_class: '../../components/email/Email', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        product: 'CHAT_BOT_OPERATION', 
        product_class: '../../components/chat-bot-operations/ChatBotOperation', 
        is_active: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_routes', null, {});
  }
};