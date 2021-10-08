import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

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
      },
      {
        id: "alarma_2",
        iconUrl: "images/get_started48.png",
        title: "Test Message 2",
        message: "You are awesome!",
      }
    ];
  }
}
