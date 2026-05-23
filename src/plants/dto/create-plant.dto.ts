import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatedByDto {
  @ApiProperty({
    format: 'uuid',
    example: '019e4d4b-9c31-7382-9fe9-9d5fd019fdd0',
  })
  @IsUUID()
  user_id: string;
}

export class LocationDto {
  @ApiProperty({ example: 'GH-01' })
  @IsString()
  greenhouse: string;

  @ApiProperty({ example: 'A2' })
  @IsString()
  sector: string;
}

export class MetadataDto {
  @ApiProperty({ example: 'mobile_app' })
  @IsOptional()
  @IsString()
  device?: string;

  @ApiProperty({ example: '1.0.0' })
  @IsOptional()
  @IsString()
  app_version?: string;
}

export class CreatePlantDto {
  @ApiProperty({ type: CreatedByDto })
  @ValidateNested()
  @Type(() => CreatedByDto)
  created_by: CreatedByDto;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({ type: 'object', additionalProperties: true })
  @IsOptional()
  metadata?: MetadataDto;

  @ApiProperty({ example: 'L001P001' })
  @IsString()
  nick_name: string;

  @ApiProperty({
    format: 'uuid',
    example: '019e4d4b-9c31-7382-9fe9-9d5fd019fdd0',
  })
  @IsUUID()
  specie_id: string;
}
