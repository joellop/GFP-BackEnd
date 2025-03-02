import { Injectable } from '@nestjs/common';
import { ReglasPorcentualModel } from 'src/Modelos/reglas-porcentual/reglas-porcentual.model';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class ReglasPorcentualService {

    constructor(private dataSource: DataSource) { }

    async obtenerReglasPorcentuales(): Promise<RespuestaAPI<ReglasPorcentualModel[]>> {
        let respuestaAPI: RespuestaAPI<ReglasPorcentualModel[]> = {
            dato: [],
            exito: false,
            mensaje: ''
        }

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.query(
                'CALL ObtenerReglasPorcentuales(@p_dato, @p_exito, @p_mensaje);'
            );

            const [respuestaPA] = await queryRunner.query(
                'SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje'
            );

            await queryRunner.commitTransaction();

            if(respuestaPA.exito == '1'){
                const datosJsonParse = JSON.parse(respuestaPA.dato);
                respuestaAPI.dato = datosJsonParse;
                respuestaAPI.exito = true;
                respuestaAPI.mensaje = respuestaPA.mensaje;
            }else{
                respuestaAPI.mensaje = respuestaPA.mensaje;
            }

            return respuestaAPI;
        } catch(error) {
            await queryRunner.rollbackTransaction();
            respuestaAPI.dato = null;
            respuestaAPI.exito = false;
            respuestaAPI.mensaje = 'error al obtener las reglas porcentuales' + error;
            return respuestaAPI;
        } finally {
            await queryRunner.release();

        }
    }
}
