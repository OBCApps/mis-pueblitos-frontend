import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtractivoTuristicoService } from '../../../../../services/atractivos-turisticos.service';
import { DtoAtractivo, DtoAtractivos } from './entities/DtoAtractivos';
import { CommonModule } from '@angular/common';
import { DtoAtractivoTuristico } from './models/DtoAtractivoTuristico';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-atractivos-turisticos',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './atractivos-turisticos.component.html',
  styleUrl: './atractivos-turisticos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtractivosTuristicosComponent {
  constructor(
    private atractivoTuristicoService: AtractivoTuristicoService,
    private readonly route: ActivatedRoute
  ) { }
  name_route = '';
  dtoAtractivoTuristicoInfo: DtoAtractivoTuristico = new DtoAtractivoTuristico();
  loading = false;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const atractivo_name = params['atractivo_name'];
      this.loading = true;
      this.atractivoTuristicoService.get_atractivos_turisticos_by_name_route(atractivo_name).subscribe(
        (data: any) => {
          this.dtoAtractivoTuristicoInfo = data;


          this.center = {
            lat: +this.dtoAtractivoTuristicoInfo.latitud,
            lng: +this.dtoAtractivoTuristicoInfo.longitud,
          };
          this.loading = false;
        },
        (err) => {
          this.loading = false;

        }
      );
    });
  }


  /* dtoAtractivoTuristicoInfo: any = {
    name: "Machu Picchu",
    type: "Sitio Arqueológico",
    description:
      "Machu Picchu es una ciudadela inca ubicada en las alturas de las montañas de los Andes en Perú, sobre el valle del río Urubamba. Fue construida en el siglo XV y luego abandonada, es famosa por sus sofisticadas paredes de piedra seca que combinan enormes bloques sin el uso de mortero, edificios fascinantes que se relacionan con alineaciones astronómicas y sus vistas panorámicas. Su exacto uso anterior sigue siendo un misterio.",
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/1200px-Machu_Picchu_early_morning.JPG",
        alt: "Vista panorámica de Machu Picchu",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Machu_Picchu_early_morning.JPG/1200px-Machu_Picchu_early_morning.JPG",
        alt: "Machu Picchu al amanecer",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Before_Machu_Picchu.jpg/1200px-Before_Machu_Picchu.jpg",
        alt: "Camino a Machu Picchu",
      },
    ],
    tickets: [
      { type: "Adulto", price: 152, currency: "PEN" },
      { type: "Estudiante", price: 77, currency: "PEN" },
      { type: "Niño (8-17 años)", price: 70, currency: "PEN" },
    ],
    location: {
      address: "Machu Picchu, Distrito de Machupicchu, Provincia de Urubamba, Cusco, Perú",
      coordinates: {
        lat: -13.1631,
        lng: -72.545,
      },
    },
    schedule: [
      { day: "Lunes a Domingo", hours: "6:00 - 17:30" },
      { day: "Último ingreso", hours: "16:00" },
    ],
    features: [
      "Patrimonio de la Humanidad UNESCO",
      "Guías disponibles",
      "Servicios higiénicos",
      "Área de descanso",
      "Tienda de recuerdos",
      "Restaurante cercano",
      "Transporte desde Aguas Calientes",
      "Vistas panorámicas",
    ],
    tags: ["Patrimonio UNESCO", "Arqueología", "Inca", "Montaña", "Trekking", "Historia", "Fotografía", "Aventura"],
    additionalInfo: {
      bestTimeToVisit: "Mayo a septiembre (temporada seca). Evitar enero y febrero por lluvias intensas.",
      weather: "Clima templado de montaña. Temperaturas entre 6°C y 19°C. Lluvias de diciembre a marzo.",
      altitude: "2,430 metros sobre el nivel del mar",
      recommendations: [
        "Llevar protector solar y sombrero",
        "Usar calzado antideslizante",
        "Hidratarse constantemente",
        "Reservar con anticipación",
        "Llevar documento de identidad",
        "No está permitido el ingreso con bastones de selfie",
      ],
    },
    travelRecommendations: [
      {
        transport: "Tren desde Cusco",
        duration: "3.5 horas",
        cost: "USD 60-200",
        description: "Viaje escénico por el Valle Sagrado hasta Aguas Calientes, luego bus a Machu Picchu.",
        tips: [
          "Reservar con anticipación, especialmente en temporada alta",
          "El tren Vistadome ofrece mejores vistas panorámicas",
          "Salidas desde estación Poroy o Ollantaytambo",
        ],
      },
      {
        transport: "Camino Inca (Trekking)",
        duration: "4 días / 3 noches",
        cost: "USD 500-800",
        description: "Caminata tradicional por antiguos senderos incas con guía obligatorio.",
        tips: [
          "Requiere reserva con 6 meses de anticipación",
          "Incluye camping y comidas",
          "Cerrado en febrero por mantenimiento",
          "Máximo 500 personas por día",
        ],
      },
      {
        transport: "Helicóptero desde Cusco",
        duration: "30 minutos",
        cost: "USD 400-600",
        description: "Vuelo directo con vistas aéreas espectaculares del Valle Sagrado.",
        tips: [
          "Sujeto a condiciones climáticas",
          "Experiencia exclusiva y rápida",
          "Ideal para personas con poco tiempo",
        ],
      },
    ],
    availableTours: [
      {
        id: "tour-1",
        name: "Machu Picchu Día Completo",
        duration: "12 horas",
        price: 280,
        currency: "USD",
        includes: [
          "Transporte desde hotel",
          "Tren turístico ida y vuelta",
          "Bus Aguas Calientes - Machu Picchu",
          "Guía profesional",
          "Entrada a Machu Picchu",
          "Almuerzo buffet",
        ],
        difficulty: "Fácil",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 1247,
      },
      {
        id: "tour-2",
        name: "Camino Inca Clásico 4D/3N",
        duration: "4 días",
        price: 650,
        currency: "USD",
        includes: [
          "Guía especializado",
          "Porteadores",
          "Equipo de camping",
          "Todas las comidas",
          "Entrada a Machu Picchu",
          "Tren de retorno",
        ],
        difficulty: "Difícil",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop",
        rating: 4.9,
        reviews: 892,
      },
      {
        id: "tour-3",
        name: "Machu Picchu + Huayna Picchu",
        duration: "14 horas",
        price: 320,
        currency: "USD",
        includes: [
          "Transporte completo",
          "Tren Vistadome",
          "Guía bilingüe",
          "Entrada Machu Picchu + Huayna Picchu",
          "Almuerzo gourmet",
          "Seguro de viaje",
        ],
        difficulty: "Moderado",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 634,
      },
    ],
  } */

  activePhotoIndex = 0

  setActivePhoto(index: number): void {
    this.activePhotoIndex = index
  }

  nextPhoto(): void {
    this.activePhotoIndex = (this.activePhotoIndex + 1) % this.dtoAtractivoTuristicoInfo.fotos.length
  }

  prevPhoto(): void {
    this.activePhotoIndex = (this.activePhotoIndex - 1 + this.dtoAtractivoTuristicoInfo.fotos.length) % this.dtoAtractivoTuristicoInfo.fotos.length
  }

  generateStars(rating: number): string[] {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push("full")
      } else if (i - 0.5 <= rating) {
        stars.push("half")
      } else {
        stars.push("empty")
      }
    }
    return stars
  }

  center: google.maps.LatLngLiteral = {
    lat: -9.130833,
    lng: -77.510833
  };
  zoom = 18;
  display: any;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}

