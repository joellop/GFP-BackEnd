export class UsuarioModelo {
  id: number;
  nombre: string;
  email: string;
  contrasena: string;
  fechaRegistro: Date;
  fechaActualizacion: Date;
  token?: string;
}


export class CambioContrasena {
  nombre_email: string;
  contrasenaNueva: string;
}