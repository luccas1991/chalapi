import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {

  @Prop()
  name: string;

  @Prop()
  author: string;
  
  @Prop()
  configs: [IrrigationConfig];
  
}

export class IrrigationConfig {
    @Prop()
    week:number;
    @Prop()
    repeat:number;
    @Prop()
    daytime:number;
    @Prop()
    ligthTime:number;
    @Prop()
    products:[ProductConfig];
}

export class ProductConfig{
    @Prop()
    name:string;
    @Prop()
    repeat:number;
    @Prop()
    amount:number;
    @Prop()
    consecutive:Boolean;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
