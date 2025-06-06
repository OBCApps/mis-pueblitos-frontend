export class FiltroGeneralServicios {
  typeServicio: string;

  filtroHabitaciones: FiltroHabitaciones = new FiltroHabitaciones();
  
  filtroTurs: FiltroTours = new FiltroTours();
  filtroRestaurantes: FiltroRestaurantes = new FiltroRestaurantes();
}

export class FiltroHabitaciones {
  precio: number;
  tipoHospedaje: string[];
  tipoHabitacion: string[];
  servicios: string[];
  idioma: string[];
}



export class FiltroTours {
  // ------ FILTRO TOUR
  precio: number;
  tipo: string[];
  tamanioGrupo: string[];
  duracion: number;
  idioma: string[];
}

export class FiltroRestaurantes {
  // ------ FILTRO RESTAURANTE
  precio: number;
  tipo: string[];
  tipoCocina: string[];
  duracionRestaurante: string[];
  horarioAtencion: string[];
  servicios: string[];
  ambiente: string[];
}
