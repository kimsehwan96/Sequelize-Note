'use strict'

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); //이건 현재 path의 이 파일명을 의미. 블라블라/models/index.js
const db = {};
const config = {
    database : 'seq_test',
    username : 'root',
    password : null,
    host: '127.0.0.1',
    dialect: 'mysql'
}

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
        model.init(sequelize);
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});




// const initDB = async(sequelize) => {
//     await sequelize.sync({force:true});
// }
//
// initDB(sequelize).then((res)=>{
//     console.log("init db success !" + res);
// })

module.exports = db;