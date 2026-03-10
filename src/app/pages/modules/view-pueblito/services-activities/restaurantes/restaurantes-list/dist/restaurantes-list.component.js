"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RestaurantesListComponent = void 0;
var core_1 = require("@angular/core");
var filtroGeneralServicios_1 = require("../../entities/filtroGeneralServicios");
var RestaurantesListComponent = /** @class */ (function () {
    function RestaurantesListComponent(titleService, modalService, habitacionService, toursService, restauranteService, router, loading, serviceServicios) {
        this.titleService = titleService;
        this.modalService = modalService;
        this.habitacionService = habitacionService;
        this.toursService = toursService;
        this.restauranteService = restauranteService;
        this.router = router;
        this.loading = loading;
        this.serviceServicios = serviceServicios;
        this.filtroBusqueda = new filtroGeneralServicios_1.FiltroGeneralServicios();
        this.list_resultadoBusqueda = [];
    }
    RestaurantesListComponent.prototype.ngOnInit = function () {
        var dataNavar = {
            sidebar: 'restaurantes'
        };
        this.transferedDataToNavar(dataNavar);
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.filtroBusqueda.typeServicio = 'REST';
        this.load_restaurantes(this.filtroBusqueda.filtroRestaurantes);
    };
    RestaurantesListComponent.prototype.load_restaurantes = function (item) {
        var _this = this;
        this.loading.show();
        this.restauranteService.get_restaurantes_byFiltro(item).subscribe(function (data) {
            _this.list_resultadoBusqueda = data.paginationresult.result;
            console.log('restaurantes:', data);
            _this.loading.hide();
        }, function (err) {
            _this.loading.hide();
            console.log('NO ENCONTRO');
        });
    };
    RestaurantesListComponent.prototype.transferedDataToNavar = function (value) {
        this.titleService.setTitle(value);
    };
    RestaurantesListComponent.prototype.gotoRestaurante = function (item) {
        this.router.navigate([
            'home',
            'Ancash',
            'chacas',
            'restaurantes',
            item.name_route,
        ]);
    };
    RestaurantesListComponent.prototype.getPrincipalImage = function (imagenes) {
        if (!imagenes || imagenes.length === 0) {
            return './assets/notFound.png';
        }
        var principal = imagenes.find(function (img) { return img.es_principal; });
        return principal ? principal.url_imagen : imagenes[0].url_imagen;
    };
    RestaurantesListComponent = __decorate([
        core_1.Component({
            selector: 'app-restaurantes-list',
            standalone: true,
            imports: [],
            templateUrl: './restaurantes-list.component.html',
            styleUrl: './restaurantes-list.component.scss'
        })
    ], RestaurantesListComponent);
    return RestaurantesListComponent;
}());
exports.RestaurantesListComponent = RestaurantesListComponent;
