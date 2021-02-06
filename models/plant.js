'use strict'

const { Model, DataTypes } = require('sequelize');

module.exports = class Plant extends Model{
    static associate(models) {
        Plant.belongsToMany(models.Tag, {
            through: 'PlantTags'
        });
    };
    static init(sequelize){
        return super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            views: DataTypes.INTEGER,
            likes: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: "Plant",
            tableName: "plants"
        });
    }
}
