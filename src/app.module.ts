import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { RecipeController } from "./recipe/recipe.controller";
import { RecipeService } from "./recipe/recipe.service";
import { User, UserSchema } from "./users/schema/user.schema";
import { Recipe, RecipeSchema } from "./recipe/schema/recipe.schema";
import { AlarmsService } from "./users/alarms.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./auth/constants";
import { LocalStrategy } from "./auth/local.strategy";
import { JwtStrategy } from "./auth/jwt.strategy";
import { AuthService } from "./auth/auth.service";
import { GrowService } from './grow/grow.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_USER
        ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}?retryWrites=true&w=majority`
        : `mongodb+srv://admin:qhITuzaXcR1u944S@cluster0.pqxb8.mongodb.net/chalapi?retryWrites=true&w=majority`
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Recipe.name, schema: RecipeSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60d" },
    }),
  ],
  controllers: [AppController, UsersController, RecipeController],
  providers: [
    AppService,
    UsersService,
    RecipeService,
    AlarmsService,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    GrowService,
  ],
})
export class AppModule {}
