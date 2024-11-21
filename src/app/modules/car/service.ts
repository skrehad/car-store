import { TCar } from './interface';
import { Car } from './model';

const createCarInDb = async (carData: TCar) => {
  if (await Car.isCarExists(carData.model, carData.brand)) {
    throw new Error('Car already exists');
  }

  const result = await Car.create(carData); // Built-in method for saving the car

  return result;
};

const getAllCarsFromDb = async () => {
  const result = await Car.find();
  return result;
};

const getSingleCarFromDb = async (id: string) => {
  const result = await Car.aggregate([
    {
      $match: { id: id },
    },
  ]);

  return result;
};

// const deleteCarFromDb = async (id: string) => {
//   const result = await Car.updateOne({ _id: id }, { isDeleted: true });
//   return result;
// };

export const CarServices = {
  createCarInDb,
  getAllCarsFromDb,
  getSingleCarFromDb,
  // deleteCarFromDb,
};
