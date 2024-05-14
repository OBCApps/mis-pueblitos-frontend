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
    gallery: []
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
  infoAdicional: {};
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
