import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';

@Injectable()
export class UsuarioService {
    constructor(private dataSource: DataSource) { }

    async iniciarSesion(nombre: string, contrasena: string): Promise<RespuestaAPI<UsuarioModelo>> {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                `CALL IniciarSesion(?, ?, @p_dato, @p_exito, @p_mensaje);`,
                [nombre, contrasena]
            );

            const [respuesta] = await queryRunner.query(
                `SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje;`
            );
            await queryRunner.commitTransaction();

            const usuarioSesion: UsuarioModelo | null = respuesta.dato
                ? Object.assign(new UsuarioModelo(), JSON.parse(respuesta.dato))
                : null;

            return {
                dato: usuarioSesion,
                exito: Boolean(respuesta.exito),
                mensaje: respuesta.mensaje,
            };
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
