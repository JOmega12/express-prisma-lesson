"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let characters = [
    {
        id: 1,
        name: "Rykard",
    },
    {
        id: 2,
        name: "Miquella",
    },
    {
        id: 3,
        name: "Milena",
    },
];
// http://localhost:3000
// app.get('/', (req, res) => {
//    res.send(`<h1>Cool </h1>`);
// });
//INDEX Endpoint
app.get('/characters', (req, res) => {
    res.send(characters);
});
//Show Endpoint
app.get("/characters/:id", (req, res) => {
    res.send(characters.find(char => char.id === +req.params.id));
});
// DELETE ENDPOINT
app.delete("/characters/:id", (req, res) => {
    const id = +req.params.id;
    const originalCharacterLength = characters.length;
    // this is the method that deletes character
    characters = characters.filter((char) => char.id !== id);
    // this checks if the actual character has been deleted
    if (characters.length >= originalCharacterLength) {
        return res.status(204).send('Noo Content :)');
    }
    // if the outcome was expected, success
    return res.status(200).send("Great Success");
});
// CREATE ENDPOINT / POST ENDPOINT
app.post("/characters", (req, res) => {
    // console.log('posting character');
    // console.log({
    //    body: req.body,
    // });
    characters.push(req.body);
    res.status(201).send(req.body);
    // res.send('yay!')
});
app.patch("/characters/:id", (req, res) => {
    const id = +req.params.id;
    characters = characters.map(char => char.id === id ? Object.assign(Object.assign({}, char), req.body) : char);
    res.status(201).send(characters.find(char => char.id));
});
app.listen(3000);
//# sourceMappingURL=app.js.map