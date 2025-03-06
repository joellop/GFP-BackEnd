export class IngresosUsuario{
    id: number;
    usuarioId: number;
    ingresoConstante: number;
    ingresoIrregular: number;
    fecha: Date;
}

export class IngresoUsuarioPorFecha{
    usuarioId: number;
    fecha: Date;
}