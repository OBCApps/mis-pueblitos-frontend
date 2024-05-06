"use strict";
exports.__esModule = true;
exports.DtoHabitacionesInfo = exports.HotelDetalle = exports.DtoHoteles = void 0;
var DtoHoteles = /** @class */ (function () {
    function DtoHoteles() {
        this.hotelDetalle = new HotelDetalle();
        this.redes_sociales = [];
        this.habitaciones = [];
        this.servicios = [];
    }
    return DtoHoteles;
}());
exports.DtoHoteles = DtoHoteles;
var HotelDetalle = /** @class */ (function () {
    function HotelDetalle() {
        this.mc_info_adicional = [];
        this.mc_redes_sociales = [];
    }
    return HotelDetalle;
}());
exports.HotelDetalle = HotelDetalle;
var DtoHabitacionesInfo = /** @class */ (function () {
    function DtoHabitacionesInfo() {
    }
    return DtoHabitacionesInfo;
}());
exports.DtoHabitacionesInfo = DtoHabitacionesInfo;
