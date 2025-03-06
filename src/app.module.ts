import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ReglasPorcentualModule } from './modules/reglas-porcentual/reglas-porcentual.module';
import { TransaccionesModule } from './modules/transacciones/transacciones.module';
import { IngresosUsuariosModule } from './modules/ingresos-usuarios/ingresos-usuarios.module';
import { CodigosVerificacionModule } from './modules/codigos-verificacion/codigos-verificacion.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { AutenticacionModule } from './modules/autenticacion/autenticacion.module';
import { EmailModule } from './modules/email/email.module';
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
