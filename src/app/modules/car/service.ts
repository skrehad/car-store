import { TCar } from './interface';
import { Car } from './model';

// Create car in DB
const createCarFromDB = (data: TCar) => {
  const result = Car.create(data);
  return result;
};

// Get all cars from DB
const getAllCarsFromDB = (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { brand: { $regex: searchTerm, $options: 'i' } },
          { model: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const result = Car.find(filter);
  return result;
};

// Get single car from DB
const getSingleCarFromDB = (id: string) => {
  const result = Car.findById(id);
  return result;
};

// Delete car from DB
const deleteACarFromDB = (id: string) => {
  const result = Car.findByIdAndDelete(id);
  return result;
};

// Update car in DB
const updateACarFromDB = (id: string, carData: TCar) => {
  const result = Car.findByIdAndUpdate(id, carData, {
    new: true,
  });

  return result;
};

export const CarService = {
  createCarFromDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  deleteACarFromDB,
  updateACarFromDB,
};
