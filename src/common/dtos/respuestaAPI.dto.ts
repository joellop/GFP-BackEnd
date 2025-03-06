export interface RespuestaAPI<T> {
    dato: T | null;
    exito: boolean;
    mensaje: string;
  }