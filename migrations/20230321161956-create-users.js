'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Type",
          key: "id",
        },
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userRole: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userPhoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      userFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userLastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userDob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      userAdress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userCategory: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      relatedUser:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
          model:'Scopes',
          key:'id'
        }
      },
      relatedType:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};