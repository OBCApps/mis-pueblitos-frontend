export class DtoHoteles {
  id: string;
  nombre: string;
  idiomas: string[];
  precios: number;
  tipo: string;
  servicios: {
    servicios: [
      {
        servicio: string;
        descripcion: string;
      },
    ];
  };
  lugar: string;
  ubicacion: string;
  contactos: {
    datos: [
      {
        tipo: string;
        valor: string;
      },
    ];
    redes_sociales: [
      {
        tipo: string;
        user: string;
        valor: string;
      }
    ];
  };
  fotos: {};
  descripcion: string;
  name_route: string;
}
