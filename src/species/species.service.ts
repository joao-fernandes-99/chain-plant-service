import { Injectable } from '@nestjs/common';

@Injectable()
export class SpeciesService {
  async getSpecieById(specie_id: string) {
    const specie = [
      { specie_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Tomato' },
    ].find((s) => s.specie_id === specie_id);
    return specie || null;
  }
}
