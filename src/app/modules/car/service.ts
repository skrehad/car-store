import { TCar } from './interface';
import { Car } from './model';

// Create car in DB
const createCarFromDB = (data: TCar) => {
  const result = Car.create(data);
  return result;
};

// Get all cars from DB
const getAllCarsFromDB = () => {
  const result = Car.find();
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
const updateACarFromDB = (id: string, data: TCar) => {
  // প্রথমে নিশ্চিত করুন যে id একটি সঠিক ObjectId, যেমন MongoDB আশা করে
  const result = Car.findByIdAndUpdate(id, data, {
    new: true, // নতুন আপডেট হওয়া ডেটা ফেরত দেয়
    runValidators: true, // ভ্যালিডেশন চালু রাখে
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
