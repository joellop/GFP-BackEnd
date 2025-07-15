import { Injectable } from '@nestjs/common';
import { RespuestaAPI } from 'src/common/dtos/respuestaAPI.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { Transaccion } from './dtos/transaccion.dto';

@Injectable()
export class TransaccionesService {
    constructor(private readonly dataSource: DataSource) { }

    async obtenerTransaccionUsuario(usuarioId: number, titulo?: string, fecha?: Date): Promise<RespuestaAPI<Transaccion[]>>{
        let respuestaAPI: RespuestaAPI<Transaccion[]>  = {
            dato: [],
            exito: false,
            mensaje:''
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.query(
                'CALL ObtenerTransaccionesDelUsuario(?, ?, ?, @p_dato, @p_exito, @p_mensaje);', 
                [usuarioId, titulo, fecha]
            );
            const [respuestaPA] = await queryRunner.query(
                'SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje'
            );

            await queryRunner.commitTransaction();

            console.log(respuestaPA.exito);
            if(respuestaPA.exito == '1'){
                const datoJsonParse = JSON.parse(respuestaPA.dato);
                respuestaAPI.dato = datoJsonParse;
                respuestaAPI.exito = true;
                respuestaAPI.mensaje = respuestaPA.mensaje;
            }else{
                respuestaAPI.mensaje = respuestaPA.mensaje;
            }

            return respuestaAPI;
        }catch (error){
            await queryRunner.rollbackTransaction();
            respuestaAPI.mensaje = 'Error al obtener las categorias del usuario: ' + error;
            return respuestaAPI;
        }finally{
            await queryRunner.release();
        }
    }

    async crearTransaccion(transaccion: Transaccion): Promise<RespuestaAPI<Transaccion>> {
        let respuestaAPI: RespuestaAPI<Transaccion> = {
            dato: new Transaccion,
            exito: false,
            mensaje: ''
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                "CALL CrearActualizarTransacciones(?, ?, ?, ?, ?, ?, ?, @p_dato, @p_exito, @p_mensaje);",
                [transaccion.id, transaccion.usuarioId, transaccion.categoriaId, transaccion.reglaPorcentualId, transaccion.titulo, transaccion.monto, transaccion.fecha]
            );

            const [respuestaPA] = await queryRunner.query(
                "SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje"
            );
            console.log(respuestaPA.exito);
            if (respuestaPA.exito == '1') {
                const datoJsonParse = JSON.parse(respuestaPA.dato);

                respuestaAPI.dato = {
                    id: datoJsonParse.id,
                    usuarioId: datoJsonParse.usuarioId,
                    categoriaId: datoJsonParse.categoriaId,
                    reglaPorcentualId: datoJsonParse.reglaPorcentualId,
                    titulo: datoJsonParse.titulo,
                    monto: datoJsonParse.monto,
                    fecha: datoJsonParse.fecha,
                }
                respuestaAPI.exito = true;
                respuestaAPI.mensaje = respuestaPA.mensaje

            } else {
                respuestaAPI.dato = null;
                respuestaAPI.mensaje = respuestaPA.mensaje
            }
            return respuestaAPI;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            respuestaAPI.dato = null;
            respuestaAPI.mensaje = 'Error al crear una transacción: ' + error
            return respuestaAPI;
        } finally {
            await queryRunner.release();
        }
    }

    async actualizarTransaccion(transaccion: Transaccion): Promise<RespuestaAPI<Transaccion>> {
        let respuestaAPI: RespuestaAPI<Transaccion> = {
            dato: new Transaccion,
            exito: false,
            mensaje: ''
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                "CALL CrearActualizarTransacciones(?, ?, ?, ?, ?, ?, ?, @p_dato, @p_exito, @p_mensaje);",
                [transaccion.id, transaccion.usuarioId, transaccion.categoriaId, transaccion.reglaPorcentualId, transaccion.titulo, transaccion.monto, transaccion.fecha]
            );

            const [respuestaPA] = await queryRunner.query(
                "SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje"
            );
            if (respuestaPA.exito == '1') {
                const datoJsonParse = JSON.parse(respuestaPA.dato);

                respuestaAPI.dato = {
                    id: datoJsonParse.id,
                    usuarioId: datoJsonParse.usuarioId,
                    categoriaId: datoJsonParse.categoriaId,
                    reglaPorcentualId: datoJsonParse.reglaPorcentualId,
                    titulo: datoJsonParse.titulo,
                    monto: datoJsonParse.monto,
                    fecha: datoJsonParse.fecha,
                }
                respuestaAPI.exito = true;
                respuestaAPI.mensaje = respuestaPA.mensaje

            } else {
                respuestaAPI.dato = null;
                respuestaAPI.mensaje = respuestaPA.mensaje
            }
            return respuestaAPI;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            respuestaAPI.dato = null;
            respuestaAPI.mensaje = 'Error al actualizar una transacción: ' + error
            return respuestaAPI;
        } finally {
            await queryRunner.release();
        }
    }

    async eliminarTransaccion(transaccionId: number): Promise<RespuestaAPI<null>> {
        let respuestaAPI: RespuestaAPI<null> = {
            dato: null,
            exito: false,
            mensaje: ''
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                "CALL EliminarTransaccion(?, @p_exito, @p_mensaje);",
                [transaccionId]
            );

            const [respuestaPA] = await queryRunner.query(
                "SELECT @p_exito as exito, @p_mensaje as mensaje"
            );
            if (respuestaPA.exito == '1') {
                respuestaAPI.exito = true;
                respuestaAPI.mensaje = respuestaPA.mensaje

            } else {
                respuestaAPI.mensaje = respuestaPA.mensaje
            }
            return respuestaAPI;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            respuestaAPI.mensaje = 'Error al eliminar una transacción: ' + error
            return respuestaAPI;
        } finally {
            await queryRunner.release();
        }
    }
}
