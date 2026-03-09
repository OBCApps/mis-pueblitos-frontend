"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HospedajesListComponent = void 0;
var core_1 = require("@angular/core");
var FiltroHospedajes_1 = require("../models/FiltroHospedajes");
var HospedajesListComponent = /** @class */ (function () {
    function HospedajesListComponent(titleService, hotelesService, router, loading) {
        this.titleService = titleService;
        this.hotelesService = hotelesService;
        this.router = router;
        this.loading = loading;
        this.filtroBusqueda = new FiltroHospedajes_1.FiltroHospedaje();
        this.list_resultadoBusqueda = [];
    }
    HospedajesListComponent.prototype.ngOnInit = function () {
        var dataNavar = { sidebar: 'hospedajes' };
        this.transferedDataToNavar(dataNavar);
        this.filtroBusqueda.status = 'AC';
        this.load_hospedajes();
    };
    HospedajesListComponent.prototype.load_hospedajes = function () {
        var _this = this;
        this.loading.show();
        this.hotelesService.filter_pagination(this.filtroBusqueda).subscribe(function (response) {
            _this.list_resultadoBusqueda = response.paginationresult.result;
            _this.loading.hide();
        }, function (err) {
            _this.loading.hide();
        });
    };
    HospedajesListComponent.prototype.transferedDataToNavar = function (value) {
        this.titleService.setTitle(value);
    };
    HospedajesListComponent.prototype.goToHospedaje = function (item) {
        console.log("item", item);
        this.router.navigate([
            'home',
            'Ancash',
            'chacas',
            'hospedajes',
            item.name_route,
        ]);
    };
    HospedajesListComponent.prototype.getPrincipalImage = function (imagenes) {
        if (!imagenes || imagenes.length === 0) {
            return './assets/notFound.png';
        }
        var principal = imagenes.find(function (img) { return img.es_principal; });
        return principal ? principal.url_imagen : imagenes[0].url_imagen;
    };
    HospedajesListComponent = __decorate([
        core_1.Component({
            selector: 'app-hospedajes-list',
            standalone: true,
            imports: [],
            templateUrl: './hospedajes-list.component.html',
            styleUrl: './hospedajes-list.component.scss'
        })
    ], HospedajesListComponent);
    return HospedajesListComponent;
}());
exports.HospedajesListComponent = HospedajesListComponent;
