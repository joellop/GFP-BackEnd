import { Catch, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource, QueryRunner } from 'typeorm';
import { UsuarioModelo } from '../Modelos/usuario/usuario.model'; // Tu modelo de usuario
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import * as bcrypt from 'bcrypt';
import { CambioContrasena } from 'src/Modelos/usuario/contrasena.model';

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
    async validarUsuario(nombre: string): Promise<RespuestaAPI<UsuarioModelo>> {

        let respuestaApi: RespuestaAPI<UsuarioModelo> =
        {
            dato: new UsuarioModelo,
            exito: false,
            mensaje: ''
        };
        let exito: boolean = false;

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                `CALL ValidarUsuario(?, @p_dato, @p_exito, @p_mensaje);`,
                [nombre]
            );

            const [respuestaPA] = await queryRunner.query(
                `SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje;`
            );

            await queryRunner.commitTransaction();

            exito = respuestaPA.exito == '1';

            if (exito) {
                const datosJsonParse = JSON.parse(respuestaPA.dato);

                respuestaApi.dato =
                {
                    id: datosJsonParse.id,
                    nombre: datosJsonParse.nombre,
                    email: datosJsonParse.email,
                    contrasena: datosJsonParse.contrasena,
                    fechaRegistro: datosJsonParse.fechaRegistro,
                    fechaActualizacion: datosJsonParse.fechaActualizacion,
                    token: ''
                };
                respuestaApi.exito = exito;
                respuestaApi.mensaje = respuestaPA.mensaje;

            } else {
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

    async validarContrasena(dato: RespuestaAPI<UsuarioModelo>, contrasenaIngresada: string): Promise<RespuestaAPI<UsuarioModelo>> {

        let contrasenaValida: boolean = false;
        try {
            if (dato.dato) {
                contrasenaValida = await bcrypt.compare(contrasenaIngresada, dato.dato.contrasena);
                if (contrasenaValida) {
                    dato.dato.contrasena = '';
                    return dato;
                } else {
                    dato.dato = null;
                    dato.exito = false;
                    dato.mensaje = 'Contraseña incorrecta';
                    return dato;
                }
            } else {
                dato.dato = null
                return dato;
            }
        } catch {
            dato.dato = null;
            dato.exito = false;
            dato.mensaje = 'Error al validar la contraseña';
            return dato;
        }
    }

    async cambiarContrasena(contrasena: CambioContrasena): Promise<RespuestaAPI<number>> {
        const saltRounds = 10;
        const usuarioEncontrado = await this.validarUsuario(contrasena.nombre_email);
        console.log(usuarioEncontrado);
        if (usuarioEncontrado.exito) {
            let contrasenaHash = await bcrypt.hash(contrasena.contrasenaNueva, saltRounds);
            const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

            try {
                await queryRunner.connect();
                await queryRunner.startTransaction();

                await queryRunner.query(
                    `CALL ActualizarContrasena(?, ?, @p_dato, @p_exito, @p_mensaje);`,
                    [usuarioEncontrado.dato?.id, contrasenaHash]
                );

                const [respuestaPA] = await queryRunner.query(
                    `SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje;`
                );

                await queryRunner.commitTransaction();
                let exito = respuestaPA.exito == '1';

                if (exito) {
                    const datosJsonParse = JSON.parse(respuestaPA.dato);

                    return {
                        dato: datosJsonParse.id,
                        exito: exito,
                        mensaje: respuestaPA.mensaje
                    }
                } else {
                    return {
                        dato: null,
                        exito: exito,
                        mensaje: respuestaPA.mensaje
                    }
                }

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
        } else {
            return{
                dato: null,
                exito: usuarioEncontrado.exito,
                mensaje: usuarioEncontrado.mensaje
            }
        }


    }
}
