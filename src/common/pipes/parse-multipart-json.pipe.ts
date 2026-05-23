import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

type MultipartJsonBody = Record<string, unknown>;

@Injectable()
export class ParseMultipartJsonPipe implements PipeTransform {
  constructor(private readonly fieldsToParse: string[] = []) {}

  transform(value: MultipartJsonBody) {
    const parsedValue = { ...value };

    for (const field of this.fieldsToParse) {
      const fieldValue = parsedValue[field];

      if (typeof fieldValue === 'string') {
        try {
          parsedValue[field] = JSON.parse(fieldValue);
        } catch {
          throw new BadRequestException(
            `Invalid JSON in multipart field "${field}"`,
          );
        }
      }
    }

    return parsedValue;
  }
}