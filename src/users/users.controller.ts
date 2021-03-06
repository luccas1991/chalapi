import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { JWTAuthGuard } from "src/auth/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { GrowService } from "src/grow/grow.service";
import { AlarmsService } from "./alarms.service";
import { CreateGrowDto } from "./dto/createGrow.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private alarmsService: AlarmsService,
    private growService: GrowService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get("grows")
  getGrows(@Request() { user }) {
    return this.growService.findAll(user);
  }

  @UseGuards(JWTAuthGuard)
  @Post("grow")
  createGrow(@Request() { user }, @Body() createGrowDto: CreateGrowDto) {
    return this.userService.addGrow(user.name, createGrowDto);
  }

  @UseGuards(JWTAuthGuard)
  @Delete("grow")
  deleteGrow(@Request() { user }, @Body() createGrowDto: CreateGrowDto) {
    return this.userService.deleteGrow(user.name, createGrowDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get("alarms")
  async getAlarms(@Request()req) {
    const user = await this.userService.findOne(req.user.name);
    return this.alarmsService.findAll(user);
  }
}
