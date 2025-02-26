import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

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

    async enviarCorreo(destinatario: string | undefined, asunto: string, contenido: string | null): Promise<boolean> {
        const opcionesCorreo = {
            from: `"${this.configService.get<string>('EMAIL_USER')}`,
            to: destinatario,
            subject: asunto,
            text: contenido,
            html: `<p>${contenido}</p>`,
        };

        try {
            await this.transporter.sendMail(opcionesCorreo);
            console.log('📧 Correo enviado con éxito');
            return true;
        } catch (error) {
            console.error('❌ Error al enviar el correo:', error);
            return false;
        }
    }
}
