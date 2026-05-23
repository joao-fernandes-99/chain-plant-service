import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import stringify from 'fast-json-stable-stringify';

@Injectable()
export class HashService {
  generateObjectHash(data: object): string {
    return crypto.createHash('sha256').update(stringify(data)).digest('hex');
  }
}
