import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { Categorias } from './dtos/categoria.dto';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) { }

    @Get("/obtenerCategoriaUsuario/:usuarioId")
    async obtenerCategoriasUsuario(@Param("usuarioId", ParseIntPipe) usuarioId: number): Promise<RespuestaAPI<Categorias[]>>{
        let respuesta = this.categoriasService.obtenerCategoriaUsuario(usuarioId);
        return respuesta;
        
    }

    @Post("/crearCategoria")
    async crearCategoria(@Body() categoria: Categorias): Promise<RespuestaAPI<Categorias>> {
        let respuesta = this.categoriasService.crearCategoria(categoria);
        return respuesta;
    }

    @Put("/actualizarCategoria")
    async actualizarCategoria(@Body() categoria: Categorias): Promise<RespuestaAPI<Categorias>> {
        let respuesta = this.categoriasService.actualizarCategoria(categoria);
        return respuesta;
    }

    @Delete("/eliminarCategoria/:categoriaId")
    async eliminarCategoria(@Param('categoriaId', ParseIntPipe) categoria: number): Promise<RespuestaAPI<null>> {
        let respuesta = this.categoriasService.eliminarCategoria(categoria);
        return respuesta;
    }
}
