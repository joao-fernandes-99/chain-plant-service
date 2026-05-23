import { Injectable, NotFoundException } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { UsersService } from '../users/users.service';
import { SpeciesService } from 'src/species/species.service';
import { HashService } from 'src/hash/hash.service';
import { PlantsRepository } from 'src/repository/plants.repository';

@Injectable()
export class PlantsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly speciesService: SpeciesService,
    private readonly hashService: HashService,
    private readonly plantsRepository: PlantsRepository,
  ) {}
  async createPlant(payload: any, attachments: any) {
    //todo: validate payload.created_by.user_id exists in users service
    const user = await this.usersService.getUserById(
      payload.created_by.user_id,
    );
    if (!user) {
      throw new NotFoundException(
        `User with id ${payload.created_by.user_id} not found`,
      );
    }

    //todo: validate payload.specie_id exists in species service
    const specie = await this.speciesService.getSpecieById(payload.specie_id);
    if (!specie) {
      throw new NotFoundException(
        `Specie with id ${payload.specie_id} not found`,
      );
    }

    //todo: save file to storage (local or cloud) and get URL

    //todo: generate file hash for integrity check

    //todo: genarate plant id with UUID V7
    const plant_id = uuidv7();
    const event_id = uuidv7();

    const plantData = {
      plant_id,
      nick_name: payload.nick_name,
      specie_id: payload.specie_id,
      created_by: payload.created_by,
      location: payload.location,
      metadata: payload.metadata,
      attachments: {
        url: 'https://example.com/file.jpg',
        hash: 'abc123def456',
      },
      creation_timestamp: new Date().toISOString(),
      creation_offset: '-180',
      schema_version: '1.0',
    };

    const plant_hash = this.hashService.generateObjectHash(plantData);

    //todo: persist plant data in database with reference to file URL and hash on plant collection (MONGODB)
    await this.plantsRepository.create({
      ...plantData,
      plant_hash,
    });

    //todo: serialize event data with plant id, event type (creation), timestamp and metadata
    //todo: persist event data in database with reference to plant id on events collection (MONGODB)

    return {
      message: 'Plant created successfully',
      plant_id: plant_id,
      plant_hash: plant_hash,
      timestamp: new Date().toISOString(),
    };
  }
}
