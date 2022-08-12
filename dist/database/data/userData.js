"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var createMany = await db_1.default.users.createMany({
    data: [{
            fullName: 'Bethany Jones',
            email: 'betpetjones@gmail.com',
            fbId: 'https://www.facebook.com/bethany.ann.jones',
            instaId: 'https://www.instagram.com/plucky.puck/',
        },
    ]
});
