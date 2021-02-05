'use strict'

const db = require('./models');


// db.User.bulkCreate([
//     {name : "kim"},
//     {name : "lee"}
// ]).then((data) => {
//     console.log(data);
// })
//
// db.Task.bulkCreate([
//     {name : "task1"},
//     {name : "task2"},
//     {name : "task3"}
// ]).then((data) => {
//     console.log(data);
// })

const assignTask = async () => {
    const kim = await db.User.create({name : "kim"});
    const lee = await db.User.create({name: "lee"});
    const task1 = await db.Task.create({name: "task1"});
    const task2 = await db.Task.create({name: "task2"});
    const task3 = await db.Task.create({name: "task3"});
    await kim.addTask(task1);
    await kim.addTask(task2);
    await lee.addTask(task2);
    await lee.addTask(task3);
}

assignTask().then((data) =>{
    console.log("success");
    console.log(data);
})
