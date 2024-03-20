export class Habitacion {
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
  fotos: object;
  hotelId: string;
  hotelNombre: string;
  estrellas: number;
  name_route: string;
  hotel: {
    id: string;
    nombre: string;
    idiomas: {
      idiomas: string[];
    };
    precios: number;
    tipo: string;
    servicios: {
      servicios: [
        {
          servicio: string;
          descripcion: string;
        }
      ];
    };
    lugar: string;
    ubicacion: string;
    contactos: {
      datos: [
        {
          tipo: string;
          valor: string;
        }
      ];
      redes_sociales: [
        {
          tipo: string;
          user: string;
          valor: string;
        }
      ];
    };
    fotos: object;
    descripcion: string;
    estrellas: number;
    name_route: string;
  };
}
