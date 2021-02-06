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
            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            }, //TODO: views와 likes는 default integer 0 으로 시작
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            imagePath: DataTypes.STRING(200),
            // TODO: 좋아요 버튼을 누를 경우 좋아요 + 1
        }, {
            sequelize,
            modelName: "Plant",
            tableName: "plants"
        });
    }
}
