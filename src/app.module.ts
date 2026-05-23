import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsController } from './plants/plants.controller';
import { PlantsService } from './plants/plants.service';
import { UsersService } from './users/users.service';
import { SpeciesService } from './species/species.service';
import { HashService } from './hash/hash.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantsRepository } from './repository/plants.repository';
import { Plant, PlantSchema } from './schemas/plant.schema';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
  ],
  controllers: [AppController, PlantsController],
  providers: [
    AppService,
    PlantsService,
    PlantsRepository,
    UsersService,
    SpeciesService,
    HashService,
  ],
})
export class AppModule {}
