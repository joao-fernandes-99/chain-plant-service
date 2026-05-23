import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlantDocument = HydratedDocument<Plant>;

@Schema({ _id: false })
export class CreatedBy {
  @Prop({ type: String, required: true })
  user_id: string;
}

@Schema({ _id: false })
export class Location {
  @Prop({ type: String, required: true })
  greenhouse: string;

  @Prop({ type: String, required: true })
  sector: string;
}

@Schema({ _id: false })
export class Metadata {
  @Prop({ type: String, required: false })
  device?: string;

  @Prop({ type: String, required: false })
  app_version?: string;
}

@Schema({ _id: false })
export class Attachments {
  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  hash: string;
}

@Schema()
export class Plant {
  @Prop({ type: String, required: true, unique: true })
  plant_id: string;

  @Prop({ type: String, required: true })
  nick_name: string;

  @Prop({ type: String, required: true })
  specie_id: string;

  @Prop({ type: CreatedBy, required: true })
  created_by: CreatedBy;

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop({ type: Metadata, required: false })
  metadata?: Metadata;

  @Prop({ type: Attachments, required: false })
  attachments?: Attachments;

  @Prop({ type: Date, required: true })
  creation_timestamp: Date;

  @Prop({ type: String, required: true })
  creation_offset: string;

  @Prop({ type: String, required: true })
  schema_version: string;

  @Prop({ type: String, required: true })
  plant_hash: string;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
