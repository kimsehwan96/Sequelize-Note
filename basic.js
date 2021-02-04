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
        //pass
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

class Tool extends Model{
    static associate(models){
        //pass
    }
    static init(sequelize){
        return super.init({
            name: DataTypes.STRING,
            size: DataTypes.STRING
        }, {
            sequelize,
            modelName: "Tool",
            tableName: "tools"                        
        });
    }
}

Tool.init(sequelize);

User.hasMany(Task);
Task.belongsTo(User);
User.hasMany(Tool, { as : "Instrument"});

const initializeDB = async () => {
    await sequelize.sync({force: true});
}

initializeDB();

const kim = User.build({
    name: "kim"
});

const makeKim = async() => {
    await kim.save();
    console.log("saved " + kim);
}

makeKim();

