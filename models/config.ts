import config from '../config/config';
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME_NEW,process.env.DB_USER_NEW, process.env.DB_PASS_NEW, {
  host: process.env.DB_HOST_NEW,
  dialect: 'mysql',
  port: '3306',
  logging: false

});

export default sequelize;