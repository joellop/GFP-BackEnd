import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReglasPorcentualService } from './reglas-porcentual.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { ReglasPorcentualModel } from 'src/Modelos/reglas-porcentual/reglas-porcentual.model';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reglas-porcentual')
export class ReglasPorcentualController {
    constructor(private reglasPorcentualService: ReglasPorcentualService){}

    @Get('/obtenerReglasPorcentuales')
    async obtenerReglasPorcentuales(): Promise<RespuestaAPI<ReglasPorcentualModel[]>>{
        let respuesta = await this.reglasPorcentualService.obtenerReglasPorcentuales();
        return respuesta;
    }
}
