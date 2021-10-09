import { Body, Controller, Get, Post } from "@nestjs/common";
import { AlarmsService } from "./alarms.service";
import { CreateGrowDto } from "./dto/createGrow.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private userService: UsersService,
    private alarmsService: AlarmsService
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('grow')
  createGrow(@Body() createGrowDto: CreateGrowDto){
    return this.userService.addGrow(createGrowDto);
  }

  @Get("alarms")
  async getAlarms() {
    const users = await this.userService.findAll();
    return this.alarmsService.findAll(users[0]);
  }
}
