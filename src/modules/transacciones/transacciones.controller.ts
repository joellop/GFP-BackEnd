import { Body, Controller, Delete, Get, Param, ParseDatePipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { Transaccion } from './dtos/transaccion.dto';
import { RespuestaAPI } from 'src/common/dtos/respuestaAPI.dto';

@Controller('transacciones')
export class TransaccionesController {
    constructor(private transaccionesService:TransaccionesService){}

    @Get("/obtenerTransacciones/:usuarioId")
    async obtenerTransacciones(
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Query('titulo') titulo?: string,
        @Query('fecha', new ParseDatePipe({optional: true})) fecha?: Date,
    ){
        console.log(fecha);
        let resultado =  await this.transaccionesService.obtenerTransaccionUsuario(usuarioId, titulo, fecha);
        return resultado;
    }

    @Post("/crearTransaccion")
    async crearTransaccion(@Body() transaccion: Transaccion): Promise<RespuestaAPI<Transaccion>>{
        let resultado = await this.transaccionesService.crearTransaccion(transaccion);
        return resultado;
    }

    @Put("/actualizarTransaccion")
    async actualizarTransaccion(@Body() transaccion: Transaccion): Promise<RespuestaAPI<Transaccion>> {
        let resultado = await this.transaccionesService.actualizarTransaccion(transaccion);
        return resultado;
        
    }

    @Delete("/eliminarTransaccion/:transaccionId")
    async eliminarTransaccion(@Param('transaccionId', ParseIntPipe) transaccionId: number): Promise<RespuestaAPI<null>>{
        let resultado = await this.transaccionesService.eliminarTransaccion(transaccionId);
        return resultado;

    }
}
