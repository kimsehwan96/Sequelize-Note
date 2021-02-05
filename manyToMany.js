const { Sequelize, DataTypes, Model } = require('sequelize');

const database = 'seq_test'
const username = 'root'
const password = null;
const host = '127.0.0.1'
const dialect = 'mysql'

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});
const db = {};
db.sequelize = sequelize;


const checkcon = async () => {
    try {
        await sequelize.authenticate();
        console.log("conn established");
    } catch (e) {
        console.log(e);
    }
}

checkcon();

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

Task.init(sequelize);

db.User = User;
db.Task = Task;

User.associate(db);
Task.associate(db);

const initializeDB = async () => {
    await sequelize.sync({force: false});
}

initializeDB();

// const kim = User.build({
//     name: "kim"
// });

// const makeUser = async(user) => {
//     await user.save();
//     console.log("saved " + user);
// }

// makeUser(kim);

// Task.bulkCreate([
//     { name : "task1" },
//     { name : "task2" },
//     { name : "task3" }
// ]).then(() => {
//     console.log('save success');
// })

//add{modelName} method

// const testMM = async() => {
//     const lee = await User.create({ name : "lee" });
//     const task1 = await Task.create({ name: "task1" });
//     const task2 = await Task.create({ name: "task2" });
//     const task3 = await Task.create({ name: "task3" });
//     await lee.addTask(task1);
//     await lee.addTask(task2);
//     await lee.addTask(task3);
//     const result = await User.findOne({
//         where : {name:"lee"},
//         include: Task 
//     });
//     console.log(result);
// }

// testMM()

const getResult = async(id) => {
    const result = await User.findOne({
        where : {id : id},
        include: Task
    });
    console.log(JSON.stringify(result, null, 2));
    return result;
}

module.exports = { getResult };



