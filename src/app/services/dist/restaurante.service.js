"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResturanteService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var rxjs_1 = require("rxjs");
var ResturanteService = /** @class */ (function () {
    function ResturanteService(http) {
        this.http = http;
        this.SERVER_REST = environment_1.API_SERVICE_WEB + '/restaurante';
    }
    ResturanteService.prototype.get_restaurantes = function () {
        return this.http.get(this.SERVER_REST).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ResturanteService.prototype.get_restaurantes_byFiltro = function (filtro) {
        return this.http.post(this.SERVER_REST + "/filter_pagination", filtro).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ResturanteService.prototype.get_restaurante_by_id = function (data) {
        return this.http.get(this.SERVER_REST + '/' + data).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ResturanteService.prototype.get_restaurante_by_name_route = function (name_route) {
        return this.http.get(this.SERVER_REST + '/findDto_byNameRoute/' + name_route).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ResturanteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ResturanteService);
    return ResturanteService;
}());
exports.ResturanteService = ResturanteService;
