const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelizeConf');

const db = {};
db.sequelize = sequelize;

class User extends Model{
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

User.init(sequelize);

class Task extends Model{
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

console.log("-------------------------")

Task.init(sequelize);

db.User = User;
db.Task = Task;

User.associate(db);
Task.associate(db);

const initializeDB = async () => {
    await sequelize.sync({force: false});
}

initializeDB();

//사실 여기서 위에 부분은 models/index.js 와 models/각모델.js 로 분리하는게 맞다.
//하지만 편의(?)를 위해서 간단히 이렇게 구현했다.

const getResultByUserId = async(id) => {
    const result = await User.findOne({
        where : {id : id},
        include: Task //Eager - Loading
    });
    // console.log(JSON.stringify(result, null, 2));
    return result;
}

const getWhoHaveTask = async(taskId) => {
    const result = await Task.findOne({
        where : {id : taskId},
        include : User
    });
    return result;
}
//I have task (id : 4) and UserId :9 has this task !

module.exports = { getResultByUserId, getWhoHaveTask };



