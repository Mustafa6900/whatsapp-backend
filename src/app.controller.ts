import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('rooms')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getRoom(clientUserId:number): Promise<any> {
    return this.appService.getRoom(clientUserId);
  }
  
}
