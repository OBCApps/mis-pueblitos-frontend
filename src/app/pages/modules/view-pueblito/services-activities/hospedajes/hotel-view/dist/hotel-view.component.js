"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HotelViewComponent = void 0;
var core_1 = require("@angular/core");
var DtoHoteles_1 = require("../entities/DtoHoteles");
var common_1 = require("@angular/common");
var HotelViewComponent = /** @class */ (function () {
    function HotelViewComponent(hotelesService, router, cdr, baseServices, usuariosContactadosMastService) {
        this.hotelesService = hotelesService;
        this.router = router;
        this.cdr = cdr;
        this.baseServices = baseServices;
        this.usuariosContactadosMastService = usuariosContactadosMastService;
        this.dtoHotelInfo = new DtoHoteles_1.DtoHoteles();
        this.loading = false;
        this.swiperElement1 = core_1.signal(null);
    }
    HotelViewComponent.prototype.ngOnInit = function () {
        this.name_route = this.router.url.split('/').pop();
        this.getHotel(this.name_route);
    };
    HotelViewComponent.prototype.getHotel = function (name_route) {
        var _this = this;
        this.baseServices.showLoading();
        this.hotelesService.get_hotel_by_name_route(name_route).subscribe(function (response) {
            _this.baseServices.hideLoading();
            _this.dtoHotelInfo = response;
            _this.loading = false;
            // Forzar detección de cambios
            _this.cdr.detectChanges();
            _this.createinfoPhotosCarrusel();
        }, function (err) {
            _this.baseServices.hideLoading();
        });
    };
    HotelViewComponent.prototype.gotoHabitacion = function (hotel_name, habitacion_name) {
        this.router.navigate([this.router.url, habitacion_name]);
    };
    HotelViewComponent.prototype.get_Keys = function (obj) {
        if (obj === undefined || obj === null) {
            return [];
        }
        else {
            return Object.keys(obj);
        }
    };
    HotelViewComponent.prototype.createinfoPhotosCarrusel = function () {
        if (typeof document !== 'undefined') {
            var swiperElemConstructor = document.getElementById('infoPhotos');
            if (swiperElemConstructor) {
                var swiperOPtions = {
                    spaceBetween: 10,
                    pagination: false,
                    navigation: {
                        enabled: true,
                        nextEl: '.swiperinfoPhotos-button-next',
                        prevEl: '.swiperinfoPhotos-button-prev'
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false // Para que el autoplay no se detenga al interactuar con el carrusel
                    },
                    breakpoints: {
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                        1280: { slidesPerView: 1 }
                    }
                };
                Object.assign(swiperElemConstructor, swiperOPtions);
                this.swiperElement1.set(swiperElemConstructor);
                this.swiperElement1().initialize();
            }
        }
    };
    HotelViewComponent.prototype.contactarNegocio = function () {
        var _this = this;
        if (!this.dtoHotelInfo.celular || this.dtoHotelInfo.celular == "") {
            this.baseServices.showMessageWarning('El negocio no tiene un contacto agreado.');
        }
        var inputCreate = { tipoNegocio: "HOSP", nameRoute: this.dtoHotelInfo.name_route };
        this.baseServices.showLoading();
        this.usuariosContactadosMastService.create(inputCreate).subscribe(function (response) {
            _this.baseServices.hideLoading();
            var numero = _this.dtoHotelInfo.celular; // Reemplaza con el número real en formato internacional
            var mensaje = '¡Hola! \n Encontré su hospedaje en la página Mis Pueblitos. \n Me gustaría saber la disponibilidad y los precios, por favor.';
            var mensajeCodificado = encodeURIComponent(mensaje);
            var url = "https://wa.me/" + numero + "?text=" + mensajeCodificado;
            window.open(url, '_blank');
        }, function (err) {
            _this.baseServices.showLoading();
            console.log("ERROR AL REGISTRAR", err);
        });
    };
    // En el archivo .ts de tu componente
    HotelViewComponent.prototype.getPrincipalImage = function (imagenes) {
        if (!imagenes || imagenes.length === 0) {
            return './assets/notFound.png';
        }
        // Buscamos la principal
        var principal = imagenes.find(function (img) { return img.es_principal; });
        // Si existe principal, retornamos su URL, sino la de la primera imagen
        return principal ? principal.url_imagen : imagenes[0].url_imagen;
    };
    HotelViewComponent.prototype.handleImageError = function (event) {
        event.target.src = './assets/notFound.png';
    };
    HotelViewComponent = __decorate([
        core_1.Component({
            selector: 'app-hotel-view',
            standalone: true,
            imports: [common_1.NgFor, common_1.NgIf],
            templateUrl: './hotel-view.component.html',
            styleUrl: './hotel-view.component.scss',
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], HotelViewComponent);
    return HotelViewComponent;
}());
exports.HotelViewComponent = HotelViewComponent;
