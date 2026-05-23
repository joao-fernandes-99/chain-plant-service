import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plant } from 'src/schemas/plant.schema';

@Injectable()
export class PlantsRepository {
  constructor(@InjectModel(Plant.name) private plantModel: Model<Plant>) {}

  async findOne(query: any): Promise<Plant | null> {
    return this.plantModel.findOne(query).sort({ _id: -1 }).exec();
  }

  async create(dataEntity: any): Promise<Plant> {
    const createdPlant = new this.plantModel(dataEntity);
    return createdPlant.save();
  }

  async findPaginate(
    query: any,
    page: number,
    limit: number,
  ): Promise<Plant[]> {
    const skip = (page - 1) * limit;
    return this.plantModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
