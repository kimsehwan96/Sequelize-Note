const db = require('../models');
const Plant = db.Plant;
const Tag = db.Tag;

const getAllPlants = async () => {
    const result = await Plant.findAll({
        include: Tag
    });
    return result;
}

//흠..
const getPlantsViews = async (plantId) => {
    const response = await Plant.findByPk((plantId));
    const views = response["views"];
    return views;
}
//TODO: 이 밑에있는 컨트롤러 로직에서 조회수 기능을 구현?!!
const getPlantById = async (plantId) => {
    const response = await Plant.findByPk((plantId), {
        include : Tag
    });
    const views = response["views"];
    //조회수 업데이트
    await Plant.update({
        views: views + 1
    }, {
        where: { id : plantId }
    });
    return response;
}

module.exports = { getAllPlants , getPlantById };