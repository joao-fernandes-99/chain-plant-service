import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getUserById(user_id: string) {
    const user = [{ user_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }].find(
      (u) => u.user_id === user_id,
    );
    return user || null;
  }
}
