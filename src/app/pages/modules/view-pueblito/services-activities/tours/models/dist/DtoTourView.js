"use strict";
exports.__esModule = true;
exports.DtoTourView = void 0;
var DtoAgenciaView_1 = require("./DtoAgenciaView");
var DtoTourView = /** @class */ (function () {
    function DtoTourView() {
        this.destinos = [];
        this.infoAdicional = [];
        this.includes = [];
        this.notIncludes = [];
        this.recomendations = [];
        this.itinerary = [];
        this.agencia = new DtoAgenciaView_1.DtoAgenciaView();
        // More NEgocios
        this.moreBussines = [];
        this.imagenes = [];
    }
    return DtoTourView;
}());
exports.DtoTourView = DtoTourView;
