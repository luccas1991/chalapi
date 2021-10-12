import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  grows: Array<Grow>
}

export class Grow {
  @Prop()
  recipeId:string
  @Prop()
  startDate:Date
  @Prop()
  name:string
  @Prop()
  image:string
}

export const UserSchema = SchemaFactory.createForClass(User);
