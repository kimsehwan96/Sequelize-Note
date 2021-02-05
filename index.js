const app = require('./app');
const sequelize = require('./sequelizeIndex');
const PORT = 8888;

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log("db conn ok");
    } catch (err) {
        console.log("error " + err);
    }
}

async function init() {
    await checkConnection();

    app.listen(PORT, () => {
        console.log('server started at ' + PORT);
    });
}

init();