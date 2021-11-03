import { Body, Controller, Request, Get, Post } from '@nestjs/common';
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
    create(@Request() { user }, @Body() createRecipeDto: CreateRecipeDto){
        createRecipeDto.author = user.name
        return this.recipeService.create(createRecipeDto)
    }
}
