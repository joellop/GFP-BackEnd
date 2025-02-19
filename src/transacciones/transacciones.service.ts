import { Injectable } from '@nestjs/common';

@Injectable()
export class TransaccionesService {
    private respuestaApi = {
        dato: [
            {
                id: 1,
                nombre: 'transaccion 1',
            },
            {
                id: 2,
                nombre: 'transaccion 2',
            }
        ],
        exito: true,
        mensaje: 'éxito'
    };

    obtenerTransacciones() {
        return this.respuestaApi;
    }
}
