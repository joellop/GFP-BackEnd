import { Injectable } from '@nestjs/common';

@Injectable()
export class TransaccionesService {
    //Ejemplo de Dto que usare mas adelante
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
