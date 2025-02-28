import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CodigosVerificacionService } from './codigos-verificacion.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { CodigoVerificacion } from 'src/Modelos/codigo-verificacion/codigo-verificacion.model';

@Controller('codigos-verificacion')
export class CodigosVerificacionController {
     constructor(private readonly codigosVerificacionService: CodigosVerificacionService) { }

     @Get('/GenerarCodigo/:usuarioId')
     async generarCodigo(@Param('usuarioId') usuarioId: number): Promise<RespuestaAPI<CodigoVerificacion>>{
      let resultado = await this.codigosVerificacionService.generarCodigo(usuarioId);

      return resultado;
     }

     @Post('/VerificarCodigo')
     async verificarCodigo(@Body() datoCodigo: CodigoVerificacion): Promise<RespuestaAPI<string>>{
        let respuesta = await this.codigosVerificacionService.verificarCodigo(datoCodigo);
        return respuesta;
     }
}
