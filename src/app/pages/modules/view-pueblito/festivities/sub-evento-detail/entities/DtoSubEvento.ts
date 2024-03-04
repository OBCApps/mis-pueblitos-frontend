export class DtoSubEvento {
  id: string;
  nombre: string;
  descripcion: string;
  foto: any;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  lugarNombre: string;
  subEventosPorDia: {
    fecha: [
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
