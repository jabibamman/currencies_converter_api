import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from '../services/api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Get(':amount')
    async RMB2EUR(@Param('amount') amount: number): Promise<string> {
      return this.apiService.RMB2EUR(amount);
    }
  
}
