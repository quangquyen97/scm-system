import config from '../config/config';
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'mysql',
  port: '3306',
  logging: false

});

export default sequelize;