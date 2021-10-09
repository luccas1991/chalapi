import { Injectable } from "@nestjs/common";
import { differenceInDays, addDays } from "date-fns";
import { RecipeService } from "src/recipe/recipe.service";
import { ProductConfig } from "src/recipe/schema/recipe.schema";
import { User } from "./schema/user.schema";
import { UsersService } from "./users.service";

@Injectable()
export class AlarmsService {
  constructor(
    private recipeService: RecipeService,
    private userService: UsersService
  ) {}

  async findAll(user: User): Promise<any> {
    const recipes = await this.recipeService.findAll();

    const alarms = user.grows.map((grow) => {
      const recipe = recipes.find((x) => x.name == grow.recipeId);

      !recipe && console.log("recipe no encontrado", grow);

      const growDay = differenceInDays(new Date(grow.startDate), new Date());
      const growWeek = Math.floor(growDay / 7);

      const notifications = recipe.configs
        .sort((x) => x.week)
        .flatMap((irrigation) => {
          if (irrigation.week >= growWeek) {
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
                  new Date(),
                  irrigation.week * 7 +
                    i * Math.floor(7 / irrigation.repeat)
                ),
                message: irrigation.products.flatMap(
                  this.mapProductMessages(products, i)
                ),
              });
              i++
            }
            return alarms;
          }
          return [];
        });

      return notifications;
    });

    return alarms;
  }

  private mapProductMessages(
    products: { name: string; uses: number }[],
    i: number
  ): (value: ProductConfig, index: number, array: ProductConfig[]) => string {
    return (product) => {
      let lineAlarm = "";
      const { uses } = products.find((x) => x.name == product.name);
      if (
        i == 0 ||
        (product.repeat < uses && ((product.consecutive && i % 2) || !(i % 2)))
      ) {
        lineAlarm = `${product.name} - ${product.amount} \n`;
        products.find((x) => x.name == product.name).uses++;
      }
      return lineAlarm;
    };
  }
}
