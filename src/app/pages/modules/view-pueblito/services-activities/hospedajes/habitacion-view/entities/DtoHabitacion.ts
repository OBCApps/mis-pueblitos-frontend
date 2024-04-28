import { DtoHoteles } from "../../entities/DtoHoteles";

export class DtoHabitacion {
  id: string;
  nombre: string;
 
  tipoMoneda: string;
  servicios : any[] = [];
  precio: number;
  disponible: boolean;
  descripcion: string;
  personas: number;
  camas: number;
  tipo: string;
  fotos: any
  hotelId: string;
  hotelNombre: string;
  estrellas: number;
  name_route: string;
  hotel: DtoHoteles = new DtoHoteles()
}
