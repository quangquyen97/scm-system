'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Types', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      typeName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      typeDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typeLevel: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Types');
  }
};