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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false
    }),
    UsuarioModule, 
    ReglasPorcentualModule, 
    TransaccionesModule, 
    IngresosUsuariosModule, 
    CodigosVerificacionModule, 
    CategoriasModule, AutenticacionModule, EmailModule],
})
export class AppModule { }
