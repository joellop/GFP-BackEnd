import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';

@Injectable()
export class UsuarioService {
    constructor(private dataSource: DataSource) { }

    

}
