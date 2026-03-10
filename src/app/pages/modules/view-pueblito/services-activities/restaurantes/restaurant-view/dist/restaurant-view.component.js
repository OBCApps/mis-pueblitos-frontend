"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RestaurantViewComponent = void 0;
var core_1 = require("@angular/core");
var DtoRestaurante_1 = require("../entities/DtoRestaurante");
var common_1 = require("@angular/common");
var BaseComponents_1 = require("../../../../../../functions/base-components/BaseComponents");
var view_pueblito_service_1 = require("../../../view-pueblito.service");
var RestaurantViewComponent = /** @class */ (function (_super) {
    __extends(RestaurantViewComponent, _super);
    function RestaurantViewComponent(restauranteService, router, route, cdr) {
        var _this = _super.call(this) || this;
        _this.restauranteService = restauranteService;
        _this.router = router;
        _this.route = route;
        _this.cdr = cdr;
        _this.routesCreated = new view_pueblito_service_1.RoutesCreated();
        _this.restaurante = new DtoRestaurante_1.DtoRestaurante();
        return _this;
    }
    RestaurantViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            _this.routesCreated.departamento = params['departamento'];
            _this.routesCreated.lugar = params['lugar'];
        });
        this.route.params.subscribe(function (params) {
            _this.load_restaurante(params['restaurante_name']);
        });
    };
    RestaurantViewComponent.prototype.load_restaurante = function (name_route) {
        var _this = this;
        this.restauranteService.get_restaurante_by_name_route(name_route).subscribe(function (data) {
            _this.restaurante = data;
            _this.cdr.detectChanges();
            _this.initializeCarruselsSwipes();
        }, function (err) {
            console.error(err);
        });
    };
    RestaurantViewComponent.prototype.initializeCarruselsSwipes = function () {
        this.initializeSwiper('infoPhotos', {
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
        });
        this.initializeSwiper('menuDates', {
            spaceBetween: 15,
            pagination: false,
            navigation: {
                enabled: true,
                nextEl: '.swiper-buttonMenu-next',
                prevEl: '.swiper-buttonMenu-prev'
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        });
        this.initializeSwiper('infoMoreBussines', {
            spaceBetween: 10,
            pagination: false,
            breakpoints: {
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        });
    };
    RestaurantViewComponent.prototype.get_Keys = function (obj) {
        if (obj === undefined || obj === null) {
            return [];
        }
        else {
            return Object.keys(obj);
        }
    };
    RestaurantViewComponent.prototype.gotoNegocio = function (item) {
        var url;
        if (item.tipo == 'REST') {
            url = "home/" + this.routesCreated.departamento + "/" + this.routesCreated.lugar + "/servicios/restaurante/" + item.name_route;
        }
        else {
            url = "home/" + this.routesCreated.departamento + "/" + this.routesCreated.lugar + "/servicios/tour/" + item.agenciadesc + "/" + item.name_route;
        }
        window.location.href = url;
    };
    RestaurantViewComponent.prototype.getPrincipalImage = function (imagenes) {
        if (!imagenes || imagenes.length === 0) {
            return './assets/notFound.png';
        }
        var principal = imagenes.find(function (img) { return img.es_principal; });
        return principal ? principal.url_imagen : imagenes[0].url_imagen;
    };
    RestaurantViewComponent = __decorate([
        core_1.Component({
            selector: 'app-restaurant-view',
            standalone: true,
            imports: [common_1.NgFor, common_1.NgClass, common_1.LowerCasePipe],
            templateUrl: './restaurant-view.component.html',
            styleUrl: './restaurant-view.component.scss',
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], RestaurantViewComponent);
    return RestaurantViewComponent;
}(BaseComponents_1.BaseComponenst));
exports.RestaurantViewComponent = RestaurantViewComponent;
