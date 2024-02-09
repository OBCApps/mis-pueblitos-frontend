export class DtoSubEvento {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  subEventos: [
    {
      diaSemana: string;
      id: string;
      nombre: string;
      descripcion: string;
      foto: string;
      dia: string;
      horaInicio: string;
      horaFin: string;
      eventoId: string;
      subEventoDetalles: [
        {
          id: string;
          detalle: string;
          organizador: string;
          foto: string;
          recomendaciones: string;
          horaInicio: string;
          horaFin: string;
          subEventoId: string;
        }
      ];
    }
  ];
  lugar: {
    id: string;
    nombre: string;
    descripcion: string;
    foto: string;
    video: string;
    masDestacado: boolean;
    departamentoId: string;
  };
}


export class ListSubEventos {
  fecha: string;
  subEventoDetalles: [
    {
      id: string;
      detalle: string;
      organizador: string;
      foto: string;
      recomendaciones: string;
      horaInicio: string;
      horaFin: string;
      subEventoId: string;
    }
  ];
}
