"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var createEvents = await db_1["default"].userEvents.createMany({
    data: [{
            userId: 1,
            eventAPIid: 'G5e0Z9CTkwvm8'
        },
        {
            userId: 1,
            eventAPIid: 'vvG1FZ9Cz0XZJe'
        },
        {
            userId: 1,
            eventAPIid: 'rZ7HnEZ1A3aOaA'
        },
    ]
});
