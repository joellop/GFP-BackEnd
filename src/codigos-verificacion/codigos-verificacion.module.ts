import { Module } from '@nestjs/common';
import { CodigosVerificacionController } from './codigos-verificacion.controller';
import { CodigosVerificacionService } from './codigos-verificacion.service';

@Module({
  controllers: [CodigosVerificacionController],
  providers: [CodigosVerificacionService]
})
export class CodigosVerificacionModule {}
