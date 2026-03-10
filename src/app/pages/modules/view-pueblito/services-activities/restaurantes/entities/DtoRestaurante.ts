import { GaleriaNegocioMast } from "../../../../../../shared/global-components/dto/GaleriaNegocioMastDto";

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
 
  contactos: any
  descripcion: string;
  servicios: any
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
      imagenes: GaleriaNegocioMast[] ;
    }
  ];
  minPrice: number;
  moreBussines: any[] = [];
  imagenes: GaleriaNegocioMast[] = [];
}
