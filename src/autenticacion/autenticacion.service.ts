import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource, QueryRunner } from 'typeorm';
import { UsuarioModelo } from '../Modelos/usuario/usuario.model'; // Tu modelo de usuario
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';

@Injectable()
export class AutenticacionService {
    constructor(private jwtService: JwtService, private dataSource: DataSource) { }

    // Método para generar el JWT
    async obtenerToken(respuestaAPI: RespuestaAPI<UsuarioModelo>) {
        const payload = { nombre: respuestaAPI.dato?.nombre, id: respuestaAPI.dato?.id }; // Aquí 'sub' puede ser el id del usuario.
        return {
            token: this.jwtService.sign(payload),
        };
    }

    // Método de validación del usuario
    async validarUsuario(nombre: string, contrasena: string): Promise<RespuestaAPI<UsuarioModelo>> {
        let respuestaApi: RespuestaAPI<UsuarioModelo> =
        {
            dato: new UsuarioModelo,
            exito: false,
            mensaje: ''
        };
        let exito: boolean = false;
        let mensaje: string = '';

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                `CALL IniciarSesion(?, ?, @p_dato, @p_exito, @p_mensaje);`,
                [nombre, contrasena]
            );

            const [respuestaPA] = await queryRunner.query(
                `SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje;`
            );

            await queryRunner.commitTransaction();

            exito = respuestaPA.exito == '1';

            if(exito){
                const datosJsonParse = JSON.parse(respuestaPA.dato);
                respuestaApi.dato = 
                {
                    id: datosJsonParse.id,
                    nombre: datosJsonParse.nombre,
                    email: datosJsonParse.email,
                    contrasena: datosJsonParse.contrasena,
                    fechaRegistro: datosJsonParse.fechaRegistro,
                    fechaActualizacion: datosJsonParse.fechaActualizacion,
                    token : ''
                };
                respuestaApi.exito = exito;
                respuestaApi.mensaje = respuestaPA.mensaje;
            }else{
                respuestaApi.dato = null;
                respuestaApi.exito = exito;
                respuestaApi.mensaje = respuestaPA.mensaje;
            }

            return respuestaApi;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return {
                dato: null,
                exito: false,
                mensaje: 'Error al ejecutar el procedimiento almacenado',
            };
        } finally {
            await queryRunner.release();
        }
    }
}
