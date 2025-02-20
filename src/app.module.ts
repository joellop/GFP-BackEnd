import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ReglasPorcentualModule } from './reglas-porcentual/reglas-porcentual.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { IngresosUsuariosModule } from './ingresos-usuarios/ingresos-usuarios.module';
import { CodigosVerificacionModule } from './codigos-verificacion/codigos-verificacion.module';
import { CategoriasModule } from './categorias/categorias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Joellopezg@1',
      database: 'gfp',
      autoLoadEntities: true,
      synchronize: false
    }),
    UsuarioModule, 
    ReglasPorcentualModule, 
    TransaccionesModule, 
    IngresosUsuariosModule, 
    CodigosVerificacionModule, 
    CategoriasModule],
})
export class AppModule { }
