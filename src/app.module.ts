import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ReglasPorcentualModule } from './reglas-porcentual/reglas-porcentual.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { IngresosUsuariosModule } from './ingresos-usuarios/ingresos-usuarios.module';
import { CodigosVerificacionModule } from './codigos-verificacion/codigos-verificacion.module';
import { CategoriasModule } from './categorias/categorias.module';
@Module({
  imports: [
    UsuarioModule, 
    ReglasPorcentualModule, 
    TransaccionesModule, 
    IngresosUsuariosModule, 
    CodigosVerificacionModule, 
    CategoriasModule],
})
export class AppModule { }
