import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CodigosVerificacionService } from './codigos-verificacion.service';
import { RespuestaAPI } from 'src/common/dtos/respuestaAPI.dto';
import { CodigoVerificacion } from './dtos/codigo-verificacion.dto';


@Controller('codigos-verificacion')
export class CodigosVerificacionController {
     constructor(private readonly codigosVerificacionService: CodigosVerificacionService) { }

     @Get('/GenerarCodigo/:usuarioId')
     async generarCodigo(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<RespuestaAPI<string>>{
      let resultado = await this.codigosVerificacionService.generarCodigo(usuarioId);

      return resultado;
     }

     @Post('/VerificarCodigo')
     async verificarCodigo(@Body() datoCodigo: CodigoVerificacion): Promise<RespuestaAPI<string>>{
        let respuesta = await this.codigosVerificacionService.verificarCodigo(datoCodigo);
        return respuesta;
     }
}
