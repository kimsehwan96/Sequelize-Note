'use strict'

const { Model, DataTypes } = require('sequelize');

module.exports = class Tag extends Model{
    static associate(models) {
        Tag.belongsToMany(models.Plant, {
            through: 'PlantTags'
        });
    };
    static init(sequelize){
        return super.init({
            name: DataTypes.STRING
        }, {
            sequelize,
            modelName: "Tag",
            tableName: "tags"
        });
    }
}
