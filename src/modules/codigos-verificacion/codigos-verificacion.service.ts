import { Injectable } from '@nestjs/common';
import { RespuestaAPI } from 'src/common/dtos/respuestaAPI.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { CodigoVerificacion } from './dtos/codigo-verificacion.dto';

@Injectable()
export class CodigosVerificacionService {
    constructor(private dataSource: DataSource) { }

    //funcion para generar el codigo
    async generarCodigo(usuarioId: number): Promise<RespuestaAPI<CodigoVerificacion>> {

        let respuestaApi: RespuestaAPI<CodigoVerificacion> =
        {
            dato: new CodigoVerificacion,
            exito: false,
            mensaje: ''
        };

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {

            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                'CALL GenerarCodigoVerificacion(?, @p_dato, @p_exito, @p_mensaje);',
                [usuarioId]
            );

            const [respuestaPA] = await queryRunner.query(
                'SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje;'
            )

            await queryRunner.commitTransaction();

            if (respuestaPA.exito == '1') {
                const datosJsonParse = JSON.parse(respuestaPA.dato);
                respuestaApi.dato =
                {
                    id: datosJsonParse.id,
                    usuarioId: datosJsonParse.usuarioId,
                    codigo: datosJsonParse.codigo,
                    fechaCreacion: datosJsonParse.fechaCreacion,
                    fechaExpiracion: datosJsonParse.fechaExpiracion,
                    usado: datosJsonParse.usado
                };
                respuestaApi.exito = true;
                respuestaApi.mensaje = respuestaPA.mensaje;
            } else {
                respuestaApi.dato = null;
                respuestaApi.exito = false;
                respuestaApi.mensaje = respuestaPA.mensaje;
            }

            return respuestaApi;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return respuestaApi =
            {
                dato: null,
                exito: false,
                mensaje: 'Ocurrio un error con al ejecutar el procedimiento almacenado: ' + error
            }
        } finally{
            await queryRunner.release();
        }

    }

    //funcion para verificar el codigo mandando por correo
    async verificarCodigo(datoCodigo: CodigoVerificacion): Promise<RespuestaAPI<string>> {

        let respuestaApi: RespuestaAPI<string> =
        {
            dato: '',
            exito: false,
            mensaje: ''
        };

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                `CALL VerificarCodigoVerificacion(?, ?, @p_exito, @p_mensaje);`,
                [datoCodigo.usuarioId, datoCodigo.codigo]
            );

            const [respuestaPA] = await queryRunner.query(
                `SELECT @p_exito as exito, @p_mensaje as mensaje;`
            );

            await queryRunner.commitTransaction();



            if (respuestaPA.exito == '1') {
                respuestaApi.dato = respuestaPA.mensaje;
                respuestaApi.exito = true;
                respuestaApi.mensaje = respuestaPA.mensaje;
            } else {
                respuestaApi.dato = null;
                respuestaApi.exito = false;
                respuestaApi.mensaje = respuestaPA.mensaje;
            }

            return respuestaApi;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return {
                dato: null,
                exito: false,
                mensaje: 'Error al ejecutar el procedimiento almacenado: ' + error,
            };
        } finally {
            await queryRunner.release();
        }
    }
}
