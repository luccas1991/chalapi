import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { Recipe, RecipeDocument } from './schema/recipe.schema';

@Injectable()
export class RecipeService {
    constructor(@InjectModel(Recipe.name) private recipeService: Model<RecipeDocument>) {}
  
    async create(createCatDto: CreateRecipeDto): Promise<Recipe> {
      const createdCat = new this.recipeService(createCatDto);
      return createdCat.save();
    }
  
    async findAll(): Promise<Recipe[]> {
      return this.recipeService.find().exec();
    }}
