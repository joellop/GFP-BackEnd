import { Module } from '@nestjs/common';
import { IngresosUsuariosController } from './ingresos-usuarios.controller';
import { IngresosUsuariosService } from './ingresos-usuarios.service';

@Module({
  controllers: [IngresosUsuariosController],
  providers: [IngresosUsuariosService]
})
export class IngresosUsuariosModule {}
