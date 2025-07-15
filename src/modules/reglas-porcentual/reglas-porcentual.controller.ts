import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReglasPorcentualService } from './reglas-porcentual.service';
import { RespuestaAPI } from 'src/common/dtos/respuestaAPI.dto';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';
import { ReglasPorcentualModel } from './dtos/reglas-porcentual.dto';


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
