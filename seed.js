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

// const assignTask = async () => {
//     const kim = await db.User.create({name : "kim"});
//     const lee = await db.User.create({name: "lee"});
//     const task1 = await db.Task.create({name: "task1"});
//     const task2 = await db.Task.create({name: "task2"});
//     const task3 = await db.Task.create({name: "task3"});
//     await kim.addTask(task1);
//     await kim.addTask(task2);
//     await lee.addTask(task2);
//     await lee.addTask(task3);
// }
//
// assignTask().then((data) =>{
//     console.log("success");
//     console.log(data);
// })

const assignTag = async () => {
    const flower1 = await db.Plant.create({
        name: "몬스테라",
        description: "키우기 쉽우며 안정감을 주는 반려식물이에요",
        imagePath: "https://seeat-image-dev-image-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%86%E1%85%A9%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%84%85%E1%85%A1.png"
    })
    const flower2 = await db.Plant.create({
        name: "관음",
        description: "관음죽은 관음관음",
        imagePath: "https://seeat-image-dev-image-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%AA%E1%86%AB%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%8C%E1%85%AE%E1%86%A8.png"
    })
    const tag1 = await db.Tag.create({
        name: "꽃"
    })
    const tag2 = await db.Tag.create({
        name: "열매"
    })
    const tag3 = await db.Tag.create({
        name: "물 많이"
    })
    const tag4 = await db.Tag.create({
        name: "물 조"
    })
    await flower1.addTag(tag2);
    await flower1.addTag(tag4);
    await flower2.addTag(tag1);
    await flower2.addTag(tag3);
}

assignTag();