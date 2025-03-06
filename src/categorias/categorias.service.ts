import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Categorias } from './dtos/categoria.dto';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';

@Injectable()
export class CategoriasService {
    constructor(private readonly dataSource: DataSource) { }

    async obtenerCategoriaUsuario(usuarioId: number): Promise<RespuestaAPI<Categorias[]>>{
        let respuestaAPI: RespuestaAPI<Categorias[]>  = {
            dato: [],
            exito: false,
            mensaje:''
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.query(
                'CALL ObtenerCategoriasDelUsuario(?, @p_dato, @p_exito, @p_mensaje);', 
                [usuarioId]
            );
            const [respuestaPA] = await queryRunner.query(
                'SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje'
            );

            await queryRunner.commitTransaction();

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

    async crearCategoria(categoria: Categorias): Promise<RespuestaAPI<Categorias>> {
        let respuestaAPI: RespuestaAPI<Categorias> = {
            dato: new Categorias,
            exito: false,
            mensaje: ''
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                "CALL CrearActualizarCategoria(?, ?, ?, ?, @p_dato, @p_exito, @p_mensaje);",
                [categoria.id, categoria.usuarioId, categoria.nombre, categoria.color]
            );

            const [respuestaPA] = await queryRunner.query(
                "SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje"
            );
            if (respuestaPA.exito == '1') {
                const datoJsonParse = JSON.parse(respuestaPA.dato);

                respuestaAPI.dato = {
                    id: datoJsonParse.id,
                    usuarioId: datoJsonParse.usuarioId,
                    nombre: datoJsonParse.nombre,
                    color: datoJsonParse.color
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
            respuestaAPI.mensaje = 'Error al crear una categoria: ' + error
            return respuestaAPI;
        } finally {
            await queryRunner.release();
        }
    }

    async actualizarCategoria(categoria: Categorias): Promise<RespuestaAPI<Categorias>> {
        let respuestaAPI: RespuestaAPI<Categorias> = {
            dato: new Categorias,
            exito: false,
            mensaje: ''
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                "CALL CrearActualizarCategoria(?, ?, ?, ?, @p_dato, @p_exito, @p_mensaje);",
                [categoria.id, categoria.usuarioId, categoria.nombre, categoria.color]
            );

            const [respuestaPA] = await queryRunner.query(
                "SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje"
            );
            if (respuestaPA.exito == '1') {
                const datoJsonParse = JSON.parse(respuestaPA.dato);

                respuestaAPI.dato = {
                    id: datoJsonParse.id,
                    usuarioId: datoJsonParse.usuarioId,
                    nombre: datoJsonParse.nombre,
                    color: datoJsonParse.color
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
            respuestaAPI.mensaje = 'Error al actualizar una categoria: ' + error
            return respuestaAPI;
        } finally {
            await queryRunner.release();
        }
    }

    async eliminarCategoria(categoriaId: number): Promise<RespuestaAPI<null>> {
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
                "CALL EliminarCategoria(?, @p_exito, @p_mensaje);",
                [categoriaId]
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
            respuestaAPI.mensaje = 'Error al eliminar una categoria: ' + error
            return respuestaAPI;
        } finally {
            await queryRunner.release();
        }
    }
}
