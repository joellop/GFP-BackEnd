import { Injectable } from '@nestjs/common';
import { IngresosUsuario } from './dtos/ingresos-usuario.dto';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class IngresosUsuariosService {
    constructor(private dataSource: DataSource) { }

    async obtenerIngresosUsuario(usuarioId: number, fecha: Date): Promise<RespuestaAPI<IngresosUsuario>> {

        let respuestaAPI: RespuestaAPI<IngresosUsuario> = {
            dato: new IngresosUsuario(),
            exito: false,
            mensaje: ''
        }
        const querryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {

            await querryRunner.connect();
            await querryRunner.startTransaction();

            await querryRunner.query(
                'CALL ObtenerIngresosDelUsuarioPorFecha(?, ?, @p_dato, @p_exito, @p_mensaje);',
                [usuarioId, fecha]
            );

            const [respuestaPA] = await querryRunner.query(
                'SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje'
            );

            await querryRunner.commitTransaction();

            if (respuestaPA.exito == '1') {
                const datoJsonParse = JSON.parse(respuestaPA.dato);

                respuestaAPI.dato = {
                    id: datoJsonParse.id,
                    usuarioId: datoJsonParse.usuarioId,
                    ingresoConstante: datoJsonParse.ingresoConstante,
                    ingresoIrregular: datoJsonParse.ingresoIrregular,
                    fecha: datoJsonParse.fecha
                }
                respuestaAPI.exito = true;
                respuestaAPI.mensaje = respuestaPA.mensaje;

            } else {
                respuestaAPI.dato = null;
                respuestaAPI.mensaje = respuestaPA.mensaje;
            }

            return respuestaAPI;
        } catch (error) {
            await querryRunner.rollbackTransaction();
            respuestaAPI.dato = null;
            respuestaAPI.mensaje = 'Error al obtener los ingresos del usuario por fecha' + error;
            return respuestaAPI;
        } finally {
            await querryRunner.release();
        }
    }

    async crearActualizarIngresos(ingresosUsuario: IngresosUsuario): Promise<RespuestaAPI<IngresosUsuario>> {
        let respuestaAPI: RespuestaAPI<IngresosUsuario> = {
            dato: new IngresosUsuario(),
            exito: false,
            mensaje: ''
        }
        const querryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            await querryRunner.connect();
            await querryRunner.startTransaction();

            await querryRunner.query(
                'CALL CrearActualizarIngresosUsuarios(?, ?, ?, ?, @p_dato, @p_exito, @p_mensaje);',
                [ingresosUsuario.usuarioId, ingresosUsuario.ingresoConstante, ingresosUsuario.ingresoIrregular, ingresosUsuario.fecha]
            );
            const [respuestaPA] = await querryRunner.query(
                'SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje'
            );

            await querryRunner.commitTransaction();

            if(respuestaPA.exito == '1'){
                const datoJsonParse = JSON.parse(respuestaPA.dato);

                respuestaAPI.dato = {
                    id: datoJsonParse.id,
                    usuarioId: datoJsonParse.usuarioId,
                    ingresoConstante: datoJsonParse.ingresoConstante,
                    ingresoIrregular: datoJsonParse.ingresoIrregular,
                    fecha: datoJsonParse.fecha
                }
                respuestaAPI.exito = true;
                respuestaAPI.mensaje= respuestaPA.mensaje;
            }else{
                respuestaAPI.dato = null;
                respuestaAPI.mensaje= respuestaPA.mensaje;
            }
            return respuestaAPI;
        } catch (error) {
            await querryRunner.rollbackTransaction();
            respuestaAPI.dato = null;
            respuestaAPI.mensaje = 'Error al crear o actualizar el ingreso deseado' + error;
            return respuestaAPI
        } finally {
            await querryRunner.release();
        }
    }

    async soloActualizarIngresos(ingresosUsuario: IngresosUsuario): Promise<RespuestaAPI<IngresosUsuario>> {
        let respuestaAPI: RespuestaAPI<IngresosUsuario> = {
            dato: new IngresosUsuario(),
            exito: false,
            mensaje: ''
        }
        const querryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            await querryRunner.connect();
            await querryRunner.startTransaction();

            await querryRunner.query(
                'CALL SoloActualizarIngresosUsuarios(?, ?, ?, ?, ?, @p_dato, @p_exito, @p_mensaje);',
                [ingresosUsuario.id, ingresosUsuario.usuarioId, ingresosUsuario.ingresoConstante, ingresosUsuario.ingresoIrregular, ingresosUsuario.fecha]
            );
            const [respuestaPA] = await querryRunner.query(
                'SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje'
            );

            await querryRunner.commitTransaction();

            if(respuestaPA.exito == '1'){
                const datoJsonParse = JSON.parse(respuestaPA.dato);

                respuestaAPI.dato = {
                    id: datoJsonParse.id,
                    usuarioId: datoJsonParse.usuarioId,
                    ingresoConstante: datoJsonParse.ingresoConstante,
                    ingresoIrregular: datoJsonParse.ingresoIrregular,
                    fecha: datoJsonParse.fecha
                }
                respuestaAPI.exito = true;
                respuestaAPI.mensaje= respuestaPA.mensaje;
            }else{
                respuestaAPI.dato = null;
                respuestaAPI.mensaje= respuestaPA.mensaje;
            }
            return respuestaAPI;
        } catch (error) {
            await querryRunner.rollbackTransaction();
            respuestaAPI.dato = null;
            respuestaAPI.mensaje = 'Error al actualizar el ingreso deseado' + error;
            return respuestaAPI
        } finally {
            await querryRunner.release();
        }
    }
}
