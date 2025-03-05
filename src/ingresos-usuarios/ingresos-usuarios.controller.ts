import { Body, Controller, Get, Param, ParseDatePipe, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';
import { IngresosUsuariosService } from './ingresos-usuarios.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { IngresosUsuario, IngresoUsuarioPorFecha } from 'src/Modelos/ingresos-usuario/ingresos-usuario.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('ingresos-usuarios')
export class IngresosUsuariosController {
    constructor(private readonly ingresosUsuariosService: IngresosUsuariosService){}

    @Get('/obtenerIngresosUsuario/:usuarioId/:fecha')
    async obtenerIngresosUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number, @Param('fecha', new ParseDatePipe) fecha: Date): Promise<RespuestaAPI<IngresosUsuario>>{
        let resultado = await this.ingresosUsuariosService.obtenerIngresosUsuario(usuarioId, fecha);
        return resultado;
    }

    @Post('/crearActualizarIngresos')
    async crearActualizarIngresos(@Body() ingresosUsuario: IngresosUsuario): Promise<RespuestaAPI<IngresosUsuario>>{
        let resultado = await this.ingresosUsuariosService.crearActualizarIngresos(ingresosUsuario);
        return resultado;
    }

    @Put('/soloActualizarIngresos')
    async soloActualizarIngresos(@Body() ingresosUsuario: IngresosUsuario):Promise<RespuestaAPI<IngresosUsuario>>{
        let resultado = await this.ingresosUsuariosService.soloActualizarIngresos(ingresosUsuario);
        return resultado;
    }
}
