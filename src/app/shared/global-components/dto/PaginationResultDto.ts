export class PaginationResultDto {
    result: any[] = [];
    page: number;
    size: number;
    totalRegistros: number;
    paginacioninicio: number;
    totalPaginas: number;
    formularioOninit: boolean = false;
}