import { Module } from '@nestjs/common';
import { ReglasPorcentualController } from './reglas-porcentual.controller';
import { ReglasPorcentualService } from './reglas-porcentual.service';

@Module({
  controllers: [ReglasPorcentualController],
  providers: [ReglasPorcentualService]
})
export class ReglasPorcentualModule {}
