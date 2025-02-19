import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {
        //Ejemplo de Dto que usare mas adelante
    private respuestaApi = {
        dato: [
            {
                id: 1,
                nombre: 'JoelBLG',
                email: 'joel_blg@outlook.com'
            },
            {
                id: 2,
                nombre: 'Prueba',
                email: 'Prueba_1234@outlook.com'
            }
        ],
        exito: true,
        mensaje: 'Sesión iniciada con éxito'
    };

    iniciarSesion() {
        return this.respuestaApi;
    }
}
