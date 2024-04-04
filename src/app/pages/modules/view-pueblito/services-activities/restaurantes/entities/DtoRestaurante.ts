export class DtoRestaurante {
  id: string;
  nombre: string;
  horaAtencion: {
    string: string;
  };
  tagHora: string;
  tags: string;
  tipo: string;
  estrellas: number;
  direccion: string;
  mapa: string;
  fotos: {
    principal: {
      url: string;
    };
    gallery: {
      url_1: string;
      url_2: string;
      url_3: string;
      url_4: string;
    };
  };
  contactos: {
    gmail: string;
    twitter: string;
    facebook: string;
    whatsapp: string;
    instagram: string;
  };
  descripcion: string;
  servicios: {
    string: string;
  };
  infoAdicional: [string];
  name_route: string;
  ambiente: string;
  menu: [
    {
      id: string;
      nombre: string;
      fotos: { url: string };
      ingredientes: string;
      precio: number;
      oferta: number;
      name_route: string;
      restauranteId: string;
    }
  ];
  minPrice: number;
}
