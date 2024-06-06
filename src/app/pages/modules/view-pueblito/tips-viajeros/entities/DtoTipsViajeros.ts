export class DtoTipsViajeros {
  id: string;
  llegarFisrtDesc: string;
  llegarsecondDesc: DtoLlegarSecondDesc[] = [];
  latitud: number;
  longitud: number;
  llegarConsejo: string;
  llevarDesc: string;
  llevarTemporada: DtoTemporada[] = []
  llevarConsejo: string;
  movilizacionDesc: string;
  ayudaDesc: string;
  ayudaEmergencias: string;
  ayudaConsejo: string;
  lugarId: string
}


export class DtoTemporada {
  nameSeason: string;
  recomendations: any[] = [];
}

export class DtoLlegarSecondDesc {
  namePlace: string;
  description: string;
  mobilities: any[] = [];
}