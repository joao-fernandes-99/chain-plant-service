import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsController } from './plants/plants.controller';
import { PlantsService } from './plants/plants.service';
import { UsersService } from './users/users.service';
import { SpeciesService } from './species/species.service';
import { HashService } from './hash/hash.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, PlantsController],
  providers: [
    AppService,
    PlantsService,
    UsersService,
    SpeciesService,
    HashService,
  ],
})
export class AppModule {}
