import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ReglasPorcentualModule } from './reglas-porcentual/reglas-porcentual.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { IngresosUsuariosModule } from './ingresos-usuarios/ingresos-usuarios.module';
import { CodigosVerificacionModule } from './codigos-verificacion/codigos-verificacion.module';
import { CategoriasModule } from './categorias/categorias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsuarioModule, 
    ReglasPorcentualModule, 
    TransaccionesModule, 
    IngresosUsuariosModule, 
    CodigosVerificacionModule, 
    CategoriasModule, AutenticacionModule, EmailModule],
})
export class AppModule { }
