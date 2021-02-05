const { Sequelize: SequelizeConf } = require('sequelize');

const database = 'seq_test'
const username = 'root'
const password = null;
const host = '127.0.0.1'
const dialect = 'mysql'

const sequelize = new SequelizeConf(database, username, password, {
    host: host,
    dialect: dialect
});

module.exports = sequelize;