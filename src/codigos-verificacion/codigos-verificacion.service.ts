import { Injectable } from '@nestjs/common';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class CodigosVerificacionService {
    constructor(private dataSource: DataSource, private autenticacion: AutenticacionService) { }

        async verificarCodigo(idUsuario: number, codigo: string): Promise<RespuestaAPI<string>> {

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
                    `CALL VerificarCodigoVerificacion(?, ?, @p_dato, @p_exito, @p_mensaje);`,
                    [idUsuario, codigo]
                );
    
                const [respuestaPA] = await queryRunner.query(
                    `SELECT @p_dato as dato, @p_exito as exito, @p_mensaje as mensaje;`
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
                    mensaje: 'Error al ejecutar el procedimiento almacenado',
                };
            } finally {
                await queryRunner.release();
            }
        }
}
