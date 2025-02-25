import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}
    
    @Post('enviar')
    async enviarCorreo(
        @Body('destinatario') destinatario: string,
        @Body('asunto') asunto: string,
        @Body('contenido') contenido: string,
    ) {
        let resultado = await this.emailService.enviarCorreo(destinatario, asunto, contenido);

        return resultado;
    }
}
