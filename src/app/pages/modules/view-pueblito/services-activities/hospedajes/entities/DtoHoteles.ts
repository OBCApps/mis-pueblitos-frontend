export class DtoHoteles {
  id: string;
  nombre: string;
  tipo: string;
  lugar: string;
  ubicacion: string;

  redes_sociales: any[] = [];
  descripcion: string;
  name_route: string;
  estrellas: number;
  habitaciones: DtoHabitacionesInfo[] = [];
  servicios: any[] = [];
  plan: number;
  correo: string;
  direccion: string;
  status: string;
  celular: string;
  info_adicional: any
  fotos: any
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
  status: string
  fotos: any[]
  hotelId: string;
  hotelNombre: string;
  estrellas: number;
  name_route: string;
}


