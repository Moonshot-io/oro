"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var createMany = await db_1["default"].users.createMany({
    data: [{
            fullName: 'Bethany Jones',
            email: 'betpetjones@gmail.com',
            fbId: 'https://www.facebook.com/bethany.ann.jones',
            instaId: 'https://www.instagram.com/plucky.puck/'
        },
    ]
});
