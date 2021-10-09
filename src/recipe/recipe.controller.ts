import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}


    @Get()
    findAll(){
        return this.recipeService.findAll()
    }

    @Post()
    create(@Body() createUserDto: CreateRecipeDto){
        return this.recipeService.create(createUserDto)
    }
}
