import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
constructor(private usuarioService: UsuarioService) {}

    @Get('/iniciarSesion')
    iniciarSesion(){
        let resultado = this.usuarioService.iniciarSesion();
        if(resultado.exito){
            return resultado;
        }else{
            return 'chale no se encontro'
        }
    }
}
