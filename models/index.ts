const { Sequelize } = require('sequelize');
import config from "../config/config";

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_pass, {
  host: config.db_host,
  dialect: config.db_dialect,
  port: config.db_port
});

export default sequelize;