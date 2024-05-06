export class DtoHoteles {
  id: string;
  nombre: string;
  tipo: string;
  lugar: string;
  ubicacion: string;
  hotelDetalle: HotelDetalle = new HotelDetalle();
  redes_sociales: any[] = [];
  descripcion: string;
  name_route: string;
  estrellas: number;
  habitaciones: DtoHabitacionesInfo[] = [];
  servicios : any [] = [];
  plan: number;
  correo: string;
  direccion: string;
  celular: string;

}

export class HotelDetalle {
  fotos: any;
  mc_info_adicional: any[] = []
  mc_redes_sociales: any[] = []
}


export class DtoHabitacionesInfo {
  id: string;
  nombre: string;
  ofrece: {
    servicios: [
      {
        servicio: string;
        descripcion: string;
      }
    ];
  };
  tipoMoneda: string;
  precio: number;
  disponible: boolean;
  descripcion: string;
  personas: number;
  camas: number;
  tipo: string;
  fotos: {
    gallery: {
      url: string;
    };
    principal: {
      url: string;
    };
  };
  hotelId: string;
  hotelNombre: string;
  estrellas: number;
  name_route: string;
}


