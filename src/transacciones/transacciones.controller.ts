import { Controller, Get } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';

@Controller('transacciones')
export class TransaccionesController {
    constructor(private transaccionesService:TransaccionesService){}

    @Get()
    obtenerTransacciones(){
        let resultado = this.transaccionesService.obtenerTransacciones();
        return resultado;
    }
}
