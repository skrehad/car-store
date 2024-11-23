"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/modules/car/route"));
const route_2 = __importDefault(require("./app/modules/order/route"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application route
app.use('/api/cars', route_1.default);
app.use('/api/orders', route_2.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
exports.default = app;
