export class FiltroGeneralServicios {
    typeServicio: string;
    
    filtroHabitaciones : FiltroHabitaciones = new FiltroHabitaciones();
    filtroTurs : FiltroTours = new FiltroTours();
    filtroRestaurantes : FiltroRestaurantes = new FiltroRestaurantes();
}

export class FiltroHabitaciones {
    // ------ FILTRO HOSPEDAJE
    precio: number;
    tipoHospedaje: string;
    tipoHabitacion: string;
    servicios: string;
}

export class FiltroTours {
    // ------ FILTRO HOSPEDAJE
    precio: number;
    tipoTour: string
    cantidadPersonasTour: string 
    duracionTour: string

}

export class FiltroRestaurantes {
    // ------ FILTRO RESTAURANTE
    precio: number;
    tipoRestaurante: string
    cantidadPersonasRestaurante: string
    duracionRestaurante: string

}