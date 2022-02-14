"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_1 = __importDefault(require("./src/routes/items"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('App is up and running');
});
app.use('/api', items_1.default);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
