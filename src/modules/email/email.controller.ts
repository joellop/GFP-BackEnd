import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { RespuestaAPI } from 'src/common/dtos/respuestaAPI.dto';
import { EmailModel } from './dtos/email.dto';


@Controller('email')
export class EmailController {

    constructor(private readonly emailService: EmailService) {}

    @Post('/enviarEmail')
    async enviarEmail(@Body() email: EmailModel):Promise<RespuestaAPI<null>>{
        let respuesta = this.emailService.enviarCorreo(email);
        return respuesta;
    }
}
