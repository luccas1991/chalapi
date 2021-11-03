import { Body, Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { RecipeService } from './recipe.service';
import { JWTAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('recipe')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}


    @Get()
    findAll(){
        return this.recipeService.findAll()
    }

    @UseGuards(JWTAuthGuard)
    @Post()
    create(@Request() { user }, @Body() createRecipeDto: CreateRecipeDto){
        createRecipeDto.author = user.name
        return this.recipeService.create(createRecipeDto)
    }
}
