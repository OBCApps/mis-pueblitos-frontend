export class DtoAtractivos {
  id: string;
  nombre: string;
  precio: number;
  tags: string;
  fotos: {
    gallery: {
      url: string;
    };
    principal: {
      url: string;
    };
  };
  ubicacion: string;
  mapa: string;
  descripcion: string;
  horario: string;
  tarifa: [string];
  InfoAdicional: [string];
  name_route: string;
}

export class DtoAtractivo {
  id: string;
  nombre: string;
  precio: number;
  tags: string;
  fotos: {
    gallery: {
      url: string;
    };
    principal: {
      url: string;
    };
  };
  ubicacion: string;
  mapa: string;
  descripcion: string;
  horario: string;
  tarifa: [string];
  InfoAdicional: [string];
  name_route: string;
  tours: [
    {
      id: string;
      nombre: string;
      duracion: number;
      precio: number;
      fotos: {
        gallery: {
          url: string;
        };
        principal: {
          url: string;
        };
      };
      descripcion: string;
      idioma: string;
      group_size: string;
      destinos: [string];
      imagesDestinos: {
        url: string;
      };
      incluye: [string];
      noIncluye: [string];
      recomendaciones: [string];
      infoAdicional: [string];
      name_route: string;
      tag: string;
      tipo: string;
      agenciaId: string;
      atractivoTuristicoId: string;
    }
  ];
}
