import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { RespuestaAPI } from 'src/common/dtos/respuestaAPI.dto';
import { EmailModel } from './dtos/email.dto';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });
    }

    async enviarCorreo(email: EmailModel): Promise<RespuestaAPI<null>> {
        let respuestaApi: RespuestaAPI<null> = {
            dato: null,
            exito: false,
            mensaje: '' 
        }
        const opcionesCorreo = {
            from: `"${this.configService.get<string>('EMAIL_USER')}`,
            to: email.para,
            subject: email.asunto,
            text: email.contenido,
            html: `<h1>Este es su codigo de seguridad</h1> 
            <br> 
            <p>Tiene aproximadamente 5 minutos para validar el codigo</p>
            <br>
            <h1><strong>${email.contenido}</strong></h1>`,
        };

        try {
            await this.transporter.sendMail(opcionesCorreo);
            respuestaApi.exito = true;
            respuestaApi.mensaje = 'Correo enviado con éxito';
            return respuestaApi;

        } catch (error) {
            respuestaApi.exito = false;
            respuestaApi.mensaje = 'Error al enviar el correo: ' + error;
            return respuestaApi;
        }
    }
}
