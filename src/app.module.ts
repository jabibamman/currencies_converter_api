import { Module } from '@nestjs/common';
import { ApiService } from './api/services/api.service';
import { ApiController } from './api/controllers/api.controller';


@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService],
})
export class AppModule {}
