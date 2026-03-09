"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ToursListComponent = void 0;
var core_1 = require("@angular/core");
var filtroGeneralServicios_1 = require("../../../entities/filtroGeneralServicios");
var common_1 = require("@angular/common");
var ToursListComponent = /** @class */ (function () {
    function ToursListComponent(titleService, toursService, router, loading, serviceServicios) {
        this.titleService = titleService;
        this.toursService = toursService;
        this.router = router;
        this.loading = loading;
        this.serviceServicios = serviceServicios;
        this.filtroBusqueda = new filtroGeneralServicios_1.FiltroGeneralServicios();
        this.list_resultadoBusqueda = [];
    }
    ToursListComponent.prototype.ngOnInit = function () {
        var dataNavar = {
            sidebar: 'tours-experiencias'
        };
        this.transferedDataToNavar(dataNavar);
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.filtroBusqueda.typeServicio = 'TOUR';
        this.load_tours(this.filtroBusqueda.filtroTurs);
    };
    ToursListComponent.prototype.load_tours = function (item) {
        var _this = this;
        this.loading.show();
        this.toursService.filter_tours(item).subscribe(function (data) {
            _this.list_resultadoBusqueda = [];
            _this.list_resultadoBusqueda = data.result;
            console.log('tours:', data);
            _this.loading.hide();
        }, function (err) {
            _this.loading.hide();
            console.log('NO ENCONTRO');
        });
    };
    ToursListComponent.prototype.transferedDataToNavar = function (value) {
        this.titleService.setTitle(value);
    };
    ToursListComponent.prototype.gotoTour = function (item) {
        this.router.navigate([
            'home',
            'Ancash',
            'chacas',
            'tours-experiencias',
            item.agencia.name_route,
            item.name_route,
        ]);
    };
    ToursListComponent.prototype.getPrincipalImage = function (imagenes) {
        if (!imagenes || imagenes.length === 0) {
            return './assets/notFound.png';
        }
        var principal = imagenes.find(function (img) { return img.es_principal; });
        return principal ? principal.url_imagen : imagenes[0].url_imagen;
    };
    ToursListComponent = __decorate([
        core_1.Component({
            selector: 'app-tours-list',
            standalone: true,
            imports: [common_1.NgIf],
            templateUrl: './tours-list.component.html',
            styleUrl: './tours-list.component.scss'
        })
    ], ToursListComponent);
    return ToursListComponent;
}());
exports.ToursListComponent = ToursListComponent;
