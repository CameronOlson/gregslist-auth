import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class HousesService {
  async getHouses() {
    const houses = await dbContext.House.find()
    if (!houses) {
      throw new Error('no Houses!')
    } return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.House.findById(houseId)
    if (!house) {
      throw new BadRequest('Invalid House Id')
    }
    return house
  }

  async createHouse(houseData) {
    const house = await dbContext.House.create(houseData)
    return house
  }

  async removeHouse(houseId) {
    const house = await this.getHouseById(houseId)
    await house.remove()
    return house
  }

  async editHouse(houseId, userId, houseData) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new BadRequest('This is Bad')
    }
    house.bedrooms = houseData.bedrooms || house.bedrooms
    house.bathrooms = houseData.bathrooms || house.bathrooms
    house.levels = houseData.levels || house.levels
    house.year = houseData.year || house.year
    house.price = houseData.price || house.price
    house.imgUrl = houseData.imgUrl || house.imgUrl
    house.description = houseData.description || house.description
    await house.save()
    return house
  }
}

export const housesService = new HousesService()
