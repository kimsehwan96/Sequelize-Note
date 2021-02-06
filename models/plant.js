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
            views: DataTypes.INTEGER, //TODO: views와 likes는 default integer 0 으로 시작
            likes: DataTypes.INTEGER // TODO: 추후 이 식물의 디테일 검색을 해서 들어올 경우 조회수 + 1
            // TODO: 좋아요 버튼을 누를 경우 좋아요 + 1
        }, {
            sequelize,
            modelName: "Plant",
            tableName: "plants"
        });
    }
}
