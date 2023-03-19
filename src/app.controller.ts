import { Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':amount')
  async RMB2EUR(@Param('amount') amount: number): Promise<string> {
    return this.appService.RMB2EUR(amount);
  }

  // example of a route with a query parameter (http://localhost:3000/?amount=100)
}
