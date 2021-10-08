import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { addDays, addSeconds } from 'date-fns'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  test(): any {
    return [
      {
        id: "alarma_1",
        iconUrl: "images/get_started48.png",
        title: "Test Message",
        message: "You are awesome!",
        date: addDays(new Date(),3)
      },
      {
        id: "alarma_2",
        iconUrl: "images/get_started48.png",
        title: "Test Message 2",
        message: "You are awesome!",
        date: addSeconds(new Date(),6)
      }
    ];
  }
}
