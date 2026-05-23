import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreatePlantDto } from './dto/create-plant.dto';

@ApiTags('plants')
@Controller('plants')
export class PlantsController {
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        created_by: {
          type: 'object',
          properties: {
            user_id: { type: 'string', format: 'uuid' },
          },
          required: ['user_id'],
        },
        location: {
          type: 'object',
          properties: {
            greenhouse: { type: 'string' },
            sector: { type: 'string' },
          },
          required: ['greenhouse', 'sector'],
        },
        attachments: {
          type: 'string',
          format: 'binary',
        },
        metadata: {
          type: 'object',
          properties: {
            device: { type: 'string' },
            app_version: { type: 'string' },
          },
        },
        nick_name: { type: 'string' },
        specie_id: { type: 'string', format: 'uuid' },
      },
      required: [
        'created_by',
        'location',
        'attachments',
        'nick_name',
        'specie_id',
      ],
    },
  })
  @UseInterceptors(FileInterceptor('attachments'))
  createPlant(
    @Body() payload: CreatePlantDto,
    @UploadedFile() attachments: any,
  ) {
    // TODO: implement creation logic (save file, persist payload)
    return {
      message: 'Plant created successfully',
      payload,
      file: attachments
        ? {
            originalname: attachments.originalname,
            mimetype: attachments.mimetype,
            size: attachments.size,
          }
        : null,
    };
  }

  @Get()
  getAllPlants(): string {
    return 'List of all plants';
  }

  @Get(':id')
  getPlantById(id: string): string {
    return `Details of plant with ID: ${id}`;
  }

  @Post(':id/events')
  createPlantEvent(id: string): string {
    return `Event created for plant with ID: ${id}`;
  }

  @Get(':id/events')
  getPlantEvents(id: string): string {
    return `List of events for plant with ID: ${id}`;
  }

  @Get(':id/events/:eventId')
  getPlantEventById(id: string, eventId: string): string {
    return `Details of event with ID: ${eventId} for plant with ID: ${id}`;
  }
}
