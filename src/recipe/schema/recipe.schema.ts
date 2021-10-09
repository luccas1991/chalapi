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
  configs: [RecipeConfig];
  
}

class RecipeConfig {
    @Prop()
    irrigations:[IrrigationConfig];
    @Prop()
    vegeWeeks: number;
    @Prop()
    flowWeeks: number;
    
}

class IrrigationConfig {
    @Prop()
    name:string;
    @Prop()
    week:number;
    @Prop()
    amout:number;
    @Prop()
    repeat:number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
