import { Injectable } from '@nestjs/common';

@Injectable()
export class SpeciesService {
  async getSpecieById(specie_id: string) {
    const specie = [{ specie_id: '123', name: 'Tomato' }].find(
      (s) => s.specie_id === specie_id,
    );
    return specie || null;
  }
}
