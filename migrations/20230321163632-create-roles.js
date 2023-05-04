'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:false
      },
      roleDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rolePermission: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      roleScopes: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};