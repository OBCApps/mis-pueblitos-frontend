export class DtoViewDepartmentAndLugares {
    id: string
    nombre: string
    descripcion: string
    foto: TipoFoto
    lugares : any [] = []
}
export class TipoFoto{
        url: string;
        lugar: string;
        titulo: string;
        proveedorId: string
}