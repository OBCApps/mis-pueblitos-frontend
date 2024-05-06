"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicesActivitiesComponent = void 0;
var core_1 = require("@angular/core");
var modal_filtros_component_1 = require("./modal-filtros/modal-filtros.component");
var forms_1 = require("@angular/forms");
var filtroGeneralServicios_1 = require("./entities/filtroGeneralServicios");
var ServicesActivitiesComponent = /** @class */ (function () {
    function ServicesActivitiesComponent(titleService, modalService, habitacionService, toursService, restauranteService, atractivoTuristicoService, router, loading) {
        this.titleService = titleService;
        this.modalService = modalService;
        this.habitacionService = habitacionService;
        this.toursService = toursService;
        this.restauranteService = restauranteService;
        this.atractivoTuristicoService = atractivoTuristicoService;
        this.router = router;
        this.loading = loading;
        // --------------- LOADS ------------ \\
        this.filtroBusqueda = new filtroGeneralServicios_1.FiltroGeneralServicios();
        this.list_resultadoBusqueda = [];
        // ----------- FUNCTION DROPDOWN SELECTOR --------------------
        this.dev = '<svg aria-hidden="true" class="h-3 me-2" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">  <rect x="0.5" width="14" height="12" rx="2" fill="white" />  <mask id="mask0_12694_49953" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="15"    height="12">    <rect x="0.5" width="14" height="12" rx="2" fill="white" />  </mask>  <g mask="url(#mask0_12694_49953)">    <path fill-rule="evenodd" clip-rule="evenodd"      d="M14.5 0H0.5V0.8H14.5V0ZM14.5 1.6H0.5V2.4H14.5V1.6ZM0.5 3.2H14.5V4H0.5V3.2ZM14.5 4.8H0.5V5.6H14.5V4.8ZM0.5 6.4H14.5V7.2H0.5V6.4ZM14.5 8H0.5V8.8H14.5V8ZM0.5 9.6H14.5V10.4H0.5V9.6ZM14.5 11.2H0.5V12H14.5V11.2Z"      fill="#D02F44" />    <rect x="0.5" width="6" height="5.6" fill="#46467F" />    <g filter="url(#filter0_d_12694_49953)">      <path fill-rule="evenodd" clip-rule="evenodd"        d="M1.83317 1.20005C1.83317 1.42096 1.68393 1.60005 1.49984 1.60005C1.31574 1.60005 1.1665 1.42096 1.1665 1.20005C1.1665 0.979135 1.31574 0.800049 1.49984 0.800049C1.68393 0.800049 1.83317 0.979135 1.83317 1.20005ZM3.1665 1.20005C3.1665 1.42096 3.01727 1.60005 2.83317 1.60005C2.64908 1.60005 2.49984 1.42096 2.49984 1.20005C2.49984 0.979135 2.64908 0.800049 2.83317 0.800049C3.01727 0.800049 3.1665 0.979135 3.1665 1.20005ZM4.1665 1.60005C4.3506 1.60005 4.49984 1.42096 4.49984 1.20005C4.49984 0.979135 4.3506 0.800049 4.1665 0.800049C3.98241 0.800049 3.83317 0.979135 3.83317 1.20005C3.83317 1.42096 3.98241 1.60005 4.1665 1.60005ZM5.83317 1.20005C5.83317 1.42096 5.68393 1.60005 5.49984 1.60005C5.31574 1.60005 5.1665 1.42096 5.1665 1.20005C5.1665 0.979135 5.31574 0.800049 5.49984 0.800049C5.68393 0.800049 5.83317 0.979135 5.83317 1.20005ZM2.1665 2.40005C2.3506 2.40005 2.49984 2.22096 2.49984 2.00005C2.49984 1.77913 2.3506 1.60005 2.1665 1.60005C1.98241 1.60005 1.83317 1.77913 1.83317 2.00005C1.83317 2.22096 1.98241 2.40005 2.1665 2.40005ZM3.83317 2.00005C3.83317 2.22096 3.68393 2.40005 3.49984 2.40005C3.31574 2.40005 3.1665 2.22096 3.1665 2.00005C3.1665 1.77913 3.31574 1.60005 3.49984 1.60005C3.68393 1.60005 3.83317 1.77913 3.83317 2.00005ZM4.83317 2.40005C5.01726 2.40005 5.1665 2.22096 5.1665 2.00005C5.1665 1.77913 5.01726 1.60005 4.83317 1.60005C4.64908 1.60005 4.49984 1.77913 4.49984 2.00005C4.49984 2.22096 4.64908 2.40005 4.83317 2.40005ZM5.83317 2.80005C5.83317 3.02096 5.68393 3.20005 5.49984 3.20005C5.31574 3.20005 5.1665 3.02096 5.1665 2.80005C5.1665 2.57914 5.31574 2.40005 5.49984 2.40005C5.68393 2.40005 5.83317 2.57914 5.83317 2.80005ZM4.1665 3.20005C4.3506 3.20005 4.49984 3.02096 4.49984 2.80005C4.49984 2.57914 4.3506 2.40005 4.1665 2.40005C3.98241 2.40005 3.83317 2.57914 3.83317 2.80005C3.83317 3.02096 3.98241 3.20005 4.1665 3.20005ZM3.1665 2.80005C3.1665 3.02096 3.01727 3.20005 2.83317 3.20005C2.64908 3.20005 2.49984 3.02096 2.49984 2.80005C2.49984 2.57914 2.64908 2.40005 2.83317 2.40005C3.01727 2.40005 3.1665 2.57914 3.1665 2.80005ZM1.49984 3.20005C1.68393 3.20005 1.83317 3.02096 1.83317 2.80005C1.83317 2.57914 1.68393 2.40005 1.49984 2.40005C1.31574 2.40005 1.1665 2.57914 1.1665 2.80005C1.1665 3.02096 1.31574 3.20005 1.49984 3.20005ZM2.49984 3.60005C2.49984 3.82096 2.3506 4.00005 2.1665 4.00005C1.98241 4.00005 1.83317 3.82096 1.83317 3.60005C1.83317 3.37913 1.98241 3.20005 2.1665 3.20005C2.3506 3.20005 2.49984 3.37913 2.49984 3.60005ZM3.49984 4.00005C3.68393 4.00005 3.83317 3.82096 3.83317 3.60005C3.83317 3.37913 3.68393 3.20005 3.49984 3.20005C3.31574 3.20005 3.1665 3.37913 3.1665 3.60005C3.1665 3.82096 3.31574 4.00005 3.49984 4.00005ZM5.1665 3.60005C5.1665 3.82096 5.01726 4.00005 4.83317 4.00005C4.64908 4.00005 4.49984 3.82096 4.49984 3.60005C4.49984 3.37913 4.64908 3.20005 4.83317 3.20005C5.01726 3.20005 5.1665 3.37913 5.1665 3.60005ZM5.49984 4.80005C5.68393 4.80005 5.83317 4.62096 5.83317 4.40005C5.83317 4.17913 5.68393 4.00005 5.49984 4.00005C5.31574 4.00005 5.1665 4.17913 5.1665 4.40005C5.1665 4.62096 5.31574 4.80005 5.49984 4.80005ZM4.49984 4.40005C4.49984 4.62096 4.3506 4.80005 4.1665 4.80005C3.98241 4.80005 3.83317 4.62096 3.83317 4.40005C3.83317 4.17913 3.98241 4.00005 4.1665 4.00005C4.3506 4.00005 4.49984 4.17913 4.49984 4.40005ZM2.83317 4.80005C3.01727 4.80005 3.1665 4.62096 3.1665 4.40005C3.1665 4.17913 3.01727 4.00005 2.83317 4.00005C2.64908 4.00005 2.49984 4.17913 2.49984 4.40005C2.49984 4.62096 2.64908 4.80005 2.83317 4.80005ZM1.83317 4.40005C1.83317 4.62096 1.68393 4.80005 1.49984 4.80005C1.31574 4.80005 1.1665 4.62096 1.1665 4.40005C1.1665 4.17913 1.31574 4.00005 1.49984 4.00005C1.68393 4.00005 1.83317 4.17913 1.83317 4.40005Z"fill="url(#paint0_linear_12694_49953)" /></g></g>  <defs><filter id="filter0_d_12694_49953" x="1.1665" y="0.800049" width="4.6665" height="5"filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"result="hardAlpha" /><feOffset dy="1" /><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" /><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12694_49953" /><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12694_49953" result="shape" /></filter><linearGradient id="paint0_linear_12694_49953" x1="1.1665" y1="0.800049" x2="1.1665" y2="4.80005"gradientUnits="userSpaceOnUse"><stop stop-color="white" /><stop offset="1" stop-color="#F0F0F0" /></linearGradient></defs></svg>USA';
    }
    ServicesActivitiesComponent.prototype.ngOnInit = function () {
        // --------- Change title
        var dataNavar = {
            sidebar: 'servicios'
        };
        this.transferedDataToNavar(dataNavar);
        // ------ GET FIRST FILTER
        this.filtroBusqueda.typeServicio = 'HOSP';
        this.get_list_filters(this.filtroBusqueda);
    };
    // --------- Change title
    ServicesActivitiesComponent.prototype.transferedDataToNavar = function (value) {
        this.titleService.setTitle(value);
    };
    ServicesActivitiesComponent.prototype.get_list_filters = function (filtro) {
        this.list_resultadoBusqueda = [];
        console.log('filtro', filtro.typeServicio, filtro, filtro.filtroHabitaciones);
        this.loading.show();
        switch (filtro.typeServicio) {
            case 'HOSP': {
                this.load_habitaciones(filtro.filtroHabitaciones);
                break;
            }
            case 'REST': {
                this.load_restaurantes(filtro.filtroRestaurantes);
                break;
            }
            case 'TOUR': {
                this.load_tours(filtro.filtroTurs);
                break;
            }
        }
    };
    // ------------- OPCION PARA LOS FILTROS  -------------
    ServicesActivitiesComponent.prototype.openModalFilters = function () {
        var data = {
            option: 'open',
            valueInput: this.filtroBusqueda.typeServicio
        };
        this.modalService.activateModal(data);
    };
    ServicesActivitiesComponent.prototype.selectFilterOptions = function () { };
    // ------------- LOADS SERVICIOS ---------------
    ServicesActivitiesComponent.prototype.load_habitaciones = function (item) {
        var _this = this;
        console.log('item', item);
        item.precio = +item.precio;
        this.habitacionService.get_habitaciones_byFiltro(item).subscribe(function (data) {
            console.log('habitaciones:', data);
            _this.list_resultadoBusqueda = data;
            _this.loading.hide();
            //console.log(data);
        }, function (err) {
            console.log('NO ENCONTRO', err);
            _this.loading.hide();
        });
    };
    ServicesActivitiesComponent.prototype.load_restaurantes = function (item) {
        var _this = this;
        this.restauranteService.get_restaurantes_byFiltro(item).subscribe(function (data) {
            _this.list_resultadoBusqueda = data;
            console.log('restaurantes:', data);
            _this.loading.hide();
        }, function (err) {
            _this.loading.hide();
            console.log('NO ENCONTRO');
        });
    };
    ServicesActivitiesComponent.prototype.load_tours = function (item) {
        var _this = this;
        console.log('item tour', item);
        this.toursService.filter_tours(item).subscribe(function (data) {
            _this.list_resultadoBusqueda = data;
            console.log('tours:', data);
            _this.loading.hide();
        }, function (err) {
            _this.loading.hide();
            console.log('NO ENCONTRO');
        });
    };
    // ------------ SELECT HABITACION  ----------------
    ServicesActivitiesComponent.prototype.gotoHabitacion = function (item) {
        this.router.navigate([
            'home',
            'Ancash',
            'Chacas',
            'servicios',
            'hospedaje',
            item.hotel.name_route,
            item.name_route,
        ]);
    };
    ServicesActivitiesComponent.prototype.gotoTour = function (item) {
        this.router.navigate([
            'home',
            'Ancash',
            'Chacas',
            'servicios',
            'tour',
            item.agencia.name_route,
            item.name_route,
        ]);
    };
    ServicesActivitiesComponent.prototype.gotoRestaurante = function (item) {
        this.router.navigate([
            'home',
            'Ancash',
            'Chacas',
            'servicios',
            'restaurante',
            item.name_route,
        ]);
    };
    ServicesActivitiesComponent = __decorate([
        core_1.Component({
            selector: 'app-services-activities',
            standalone: true,
            imports: [modal_filtros_component_1.ModalFiltrosComponent, forms_1.FormsModule],
            templateUrl: './services-activities.component.html',
            styleUrl: './services-activities.component.scss'
        })
    ], ServicesActivitiesComponent);
    return ServicesActivitiesComponent;
}());
exports.ServicesActivitiesComponent = ServicesActivitiesComponent;
