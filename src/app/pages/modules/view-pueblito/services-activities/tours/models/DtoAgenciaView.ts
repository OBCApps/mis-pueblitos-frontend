import { DtoTourView } from "./DtoTourView";

export class DtoAgenciaView {
    id: string;
    nombre: string;
    estrellas: number;
    direccion: string;
    mapa: string;
    fotos: {
        gallery: string[];
        principal: string;
    };
    contactos: any; // Tipo de dato para contactos
    descripcion: string;
    mision: string;
    plan: number;
    vision: string;
    equipo: string;
    infoAdicional: { name: string; desc: string; }[] = [];
    name_route: string;
    userId: string;
    tours: DtoTourView[] = []
}
