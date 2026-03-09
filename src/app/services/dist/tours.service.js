"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ToursService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var rxjs_1 = require("rxjs");
var ToursService = /** @class */ (function () {
    function ToursService(http) {
        this.http = http;
        this.SERVER_TOURS = environment_1.API_SERVICE_WEB + '/tour';
        this.SERVER_AGENCIA = environment_1.API_SERVICE_WEB + '/agencia';
    }
    ToursService.prototype.filter_tours = function (data) {
        return this.http.post(this.SERVER_TOURS + '/filter_pagination', data).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ToursService.prototype.get_tours = function () {
        return this.http.get(this.SERVER_TOURS).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ToursService.prototype.get_tour_by_id = function (data) {
        return this.http.get(this.SERVER_TOURS + '/' + data).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ToursService.prototype.get_tour_by_name_route = function (name_route) {
        return this.http.get(this.SERVER_TOURS + '/findDto_byNameRoute/' + name_route).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ToursService.prototype.get_agencia_by_name_route = function (name_route) {
        return this.http.get(this.SERVER_AGENCIA + '/name_route/' + name_route).pipe(rxjs_1.map(function (response) { return response; }));
    };
    ToursService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ToursService);
    return ToursService;
}());
exports.ToursService = ToursService;
