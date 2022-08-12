"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var createEvents = await db_1.default.userEvents.createMany({
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
            eventAPIid: 'KovZpZAEvtFA'
        },
        {
            userId: 1,
            eventAPIid: 'K8vZ917_sF7'
        },
        {
            userId: 1,
            eventAPIid: 'rZ7HnEZ1A3aOaA'
        },
    ]
});
