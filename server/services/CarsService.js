import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CarsService {
  async getCars() {
    const cars = await dbContext.Car.find()
    if (!cars) {
      throw new Error('No cars!')
    } return cars
  }

  async getCarById(carId) {
    const car = await dbContext.Car.findById(carId)
    if (!car) {
      throw new BadRequest('Invalid Car Id')
    }
    return car
  }

  async createCar(carData) {
    const car = await dbContext.Car.create(carData)
    return car
  }

  async removeCar(carId) {
    const car = await this.getCarById(carId)
    await car.remove()
    return car
  }

  async editCar(carId, userId, carData) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new BadRequest('This is Bad')
    }
    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.price = carData.price || car.price
    car.description = carData.description || car.description
    car.year = carData.year || car.year
    await car.save()
    return car
  }
}

export const carsService = new CarsService()
