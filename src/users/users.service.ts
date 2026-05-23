import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getUserById(user_id: string) {
    const user = [{ user_id: '123' }].find((u) => u.user_id === user_id);
    return user || null;
  }
}
