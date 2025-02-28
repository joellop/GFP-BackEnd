import { Body, Controller, Get } from '@nestjs/common';
import { CodigosVerificacionService } from './codigos-verificacion.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';

@Controller('codigos-verificacion')
export class CodigosVerificacionController {
     constructor(private readonly codigosVerificacionService: CodigosVerificacionService) { }

     @Get('verificarCodigo')
     async verificarCodigo(@Body() idUsuario: number, @Body() codigo: string): Promise<RespuestaAPI<string>>{
        let respuesta = await this.codigosVerificacionService.verificarCodigo(idUsuario, codigo);
        return respuesta;
     }
}
