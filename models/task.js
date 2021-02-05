'use strict'

const { Model, DataTypes } = require('sequelize');

module.exports = class Task extends Model{
        static associate(models){
            Task.belongsToMany(models.User, {
                through: 'UserTasks'
            });
        }
        static init(sequelize){
            return super.init({
                name:DataTypes.STRING
            }, {
                sequelize,
                modelName: "Task",
                tableName: "tasks"
            });
        }
    }


