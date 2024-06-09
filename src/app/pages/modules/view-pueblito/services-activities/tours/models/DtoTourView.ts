import { DtoAgenciaView } from "./DtoAgenciaView";

export class DtoTourView {
    nombre: string;
    duracion: string;
    precio: number;
    fotos: { gallery: string[]; principal: string; };
    descripcion: string;
    destinos: { name: string, desc: string, photo: string }[] = [];
    name_route: string;
    tag: string;
    agenciaId: string;
    idioma: string;
    tipo: string;
    infoAdicional: { desc: string; name: string }[] = [];
    includes: { desc: string }[] = [];
    notIncludes: { desc: string }[] = [];
    recomendations: { desc: string }[] = [];
    itinerary: { title: string; detail: {desc} [] }[] = [];
    minPerson: string;
    maxPerson: string;
    agencia: DtoAgenciaView = new DtoAgenciaView();
    flagTipeTour : string

    // More NEgocios
    moreBussines : any [] = []
}