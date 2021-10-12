import { Injectable } from "@nestjs/common";
import { addDays, closestIndexTo, differenceInDays } from "date-fns";
import { RecipeService } from "src/recipe/recipe.service";
import { Recipe } from "src/recipe/schema/recipe.schema";
import { AlarmsService } from "src/users/alarms.service";
import { User } from "src/users/schema/user.schema";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GrowService {
  constructor(
    private recipeService: RecipeService,
    private usersService: UsersService,
    private alamrsService: AlarmsService
  ) {}

  async findAll({name}: User): Promise<any> {
      
    const user = await this.usersService.findOne(name);
    const recipes = await this.recipeService.findAll();

    const grows = user.grows.map((grow) => {
      const recipe = recipes.find((x) => x.name == grow.recipeId);

      !recipe && console.log("recipe no encontrado", grow);

      const growDay = differenceInDays(new Date(),new Date(grow.startDate));
          const growWeek = Math.floor(growDay / 7);

      const irrigations = this.alamrsService.getAlarms(recipe, grow);

      const closestIrrigation = closestIndexTo(
        new Date(),
        irrigations.map((x) => x.date)
      );

      let pre, post, daytime;

      if (
        differenceInDays(irrigations[closestIrrigation].date, new Date()) > 0
      ) {
        pre=irrigations[closestIrrigation-1];
        post=irrigations[closestIrrigation];
      }
      else{
        pre=irrigations[closestIrrigation];
        post=irrigations[closestIrrigation+1];
      }

      daytime = pre.daytime > 16 ? 'vege' : 'flora'

      return {
        nickName: grow.name,
        week: growWeek,
        daytime,
        irrigations: {
          pre,
          post,
        },
      };
    });

    return grows;
  }
}
