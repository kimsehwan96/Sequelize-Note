'use strict'

const { Model, DataTypes } = require('sequelize');

module.exports = class User extends Model{
        static associate(models) {
            User.belongsToMany(models.Task, {
                through: 'UserTasks'
            });
        };
        static init(sequelize){
            return super.init({
                name: DataTypes.STRING
            }, {
                sequelize,
                modelName: "User",
                tableName: "users"
            });
        }
    }
