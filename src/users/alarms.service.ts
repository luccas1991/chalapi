import { Injectable } from "@nestjs/common";
import { differenceInDays, addDays } from "date-fns";
import { RecipeService } from "src/recipe/recipe.service";
import { ProductConfig, Recipe } from "src/recipe/schema/recipe.schema";
import { Grow, User } from "./schema/user.schema";
import { UsersService } from "./users.service";

@Injectable()
export class AlarmsService {
  constructor(private recipeService: RecipeService) {}

  async findAll(user: User): Promise<any> {
    const recipes = await this.recipeService.findAll();

    const alarms = user.grows.map((grow) => {
      const recipe = recipes.find((x) => x.name == grow.recipeId);

      !recipe && console.log("recipe no encontrado", grow);

      return this.getAlarms(recipe, grow);
    });

    return alarms;
  }

  getAlarms(
    recipe: Recipe,
    grow: Grow
  ): {
    iconUrl: string;
    title: string;
    date: Date;
    message: string;
    daytime: string;
  }[] {
    return recipe.configs
      .sort((x) => x.week)
      .flatMap((irrigation) => {
        let i = 0;
        const alarms = [];
        let products = irrigation.products.map((product) => ({
          name: product.name,
          uses: 0,
        }));
        while (i < irrigation.repeat) {
          alarms.push({
            iconUrl: grow.image,
            title: grow.name,
            date: addDays(
              new Date(grow.startDate),
              irrigation.week * 7 + i * Math.floor(7 / irrigation.repeat)
            ),
            products: irrigation.products
              .flatMap(this.mapProductMessages(products, i))
              .filter((x) => x),
            daytime: irrigation.daytime,
          });
          i++;
        }
        return alarms;
      });
  }

  private mapProductMessages(
    products: { name: string; uses: number }[],
    i: number
  ): (
    value: ProductConfig,
    index: number,
    array: ProductConfig[]
  ) => { name: string; amount: number } {
    return (product) => {
      let outProduct;
      const { uses } = products.find((x) => x.name == product.name);
      if (
        i == 0 ||
        (product.repeat < uses && ((product.consecutive && i % 2) || !(i % 2)))
      ) {
        outProduct = { amount: product.amount, name: product.name };
        products.find((x) => x.name == product.name).uses++;
      }
      return outProduct;
    };
  }
}
