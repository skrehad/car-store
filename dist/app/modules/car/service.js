"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const model_1 = require("./model");
// Create car in DB
const createCarFromDB = (data) => {
    const result = model_1.Car.create(data);
    return result;
};
// Get all cars from DB
const getAllCarsFromDB = (searchTerm) => {
    const filter = searchTerm
        ? {
            $or: [
                { brand: { $regex: searchTerm, $options: 'i' } },
                { model: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};
    const result = model_1.Car.find(filter);
    return result;
};
// Get single car from DB
const getSingleCarFromDB = (id) => {
    const result = model_1.Car.findById(id);
    return result;
};
// Delete car from DB
const deleteACarFromDB = (id) => {
    const result = model_1.Car.findByIdAndDelete(id);
    return result;
};
// Update car in DB
const updateACarFromDB = (id, carData) => {
    const result = model_1.Car.findByIdAndUpdate(id, carData, {
        new: true,
    });
    return result;
};
exports.CarService = {
    createCarFromDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    deleteACarFromDB,
    updateACarFromDB,
};
