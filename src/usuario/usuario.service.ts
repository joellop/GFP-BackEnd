
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';
import * as bcrypt from 'bcrypt'
import { CambioContrasena } from 'src/Modelos/usuario/contrasena.model';

@Injectable()
export class UsuarioService {
    constructor(private dataSource: DataSource) { }

    async crearUsuario(usuario: UsuarioModelo): Promise<RespuestaAPI<UsuarioModelo>> {
        const saltRounds = 10;
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, saltRounds);
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
                `CALL CrearActualizarUsuario(?, ?, ?, ?, @p_dato, @p_exito, @p_mensaje);`,
                [usuario.id, usuario.nombre, usuario.email, usuario.contrasena]
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
                    fechaActualizacion: datosJsonParse.fechaActualizacion
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
