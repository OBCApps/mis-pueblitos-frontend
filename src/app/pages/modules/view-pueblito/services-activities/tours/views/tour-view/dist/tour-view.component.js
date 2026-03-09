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
exports.TourViewComponent = void 0;
var core_1 = require("@angular/core");
var view_pueblito_service_1 = require("../../../../view-pueblito.service");
var DtoTourView_1 = require("../../models/DtoTourView");
var common_1 = require("@angular/common");
var BaseComponents_1 = require("../../../../../../../functions/base-components/BaseComponents");
var sweetalert2_1 = require("sweetalert2");
var TourViewComponent = /** @class */ (function (_super) {
    __extends(TourViewComponent, _super);
    function TourViewComponent(toursService, router, route, loading, cdr) {
        var _this = _super.call(this) || this;
        _this.toursService = toursService;
        _this.router = router;
        _this.route = route;
        _this.loading = loading;
        _this.cdr = cdr;
        _this.routesCreated = new view_pueblito_service_1.RoutesCreated();
        _this.tourView = new DtoTourView_1.DtoTourView();
        return _this;
    }
    TourViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.routesCreated.agencia_name = params['agencia_name'];
            _this.routesCreated.tour_name = params['tour_name'];
            _this.loadTour(_this.routesCreated.tour_name);
        });
        this.route.parent.params.subscribe(function (params) {
            _this.routesCreated.departamento = params['departamento'];
            _this.routesCreated.lugar = params['lugar'];
        });
    };
    TourViewComponent.prototype.loadTour = function (tour_name) {
        var _this = this;
        this.loading.show();
        this.toursService.get_tour_by_name_route(tour_name).subscribe(function (data) {
            _this.loading.hide();
            _this.tourView = data;
            _this.cdr.detectChanges();
            _this.initializeCarruselsSwipes();
            //this.createinfoPhotosCarrusel()
            //this.createinfoMoreBussinesCarrusel();
            _this.reservarAhora('https://calendar.google.com/calendar/appointments/schedules/AcZssZ39SoK7uLrHc0LgCZHY1BrMfS4-K4Ok5HuryGgwm6sAaY2PJJrsS6vg8RntEEQ7aPxj_MrFfEJp?gv=true');
        }, function (err) {
            _this.loading.hide();
        });
    };
    TourViewComponent.prototype.gotoAgencia = function () {
        this.router.navigate(['home', this.routesCreated.departamento, this.routesCreated.lugar, 'tours-experiencias', this.routesCreated.agencia_name]);
    };
    TourViewComponent.prototype.initializeCarruselsSwipes = function () {
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
        this.initializeSwiper('infoMoreBussines', {
            spaceBetween: 10,
            pagination: false,
            navigation: {
                enabled: true,
                nextEl: '.swiperinfoMoreBussines-button-next',
                prevEl: '.swiperinfoMoreBussines-button-prev'
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        });
    };
    TourViewComponent.prototype.initializeGoogleCalendar = function (url) {
        if (this.googleCalendarButton && this.googleCalendarButton.nativeElement) {
            calendar.schedulingButton.load({
                url: url,
                color: '#1AC816',
                label: 'Reservar',
                target: this.googleCalendarButton.nativeElement
            });
        }
    };
    TourViewComponent.prototype.reservarAhora = function (url) {
        this.initializeGoogleCalendar(url);
    };
    TourViewComponent.prototype.gotoNegocio = function (item) {
        if (item.tipo === 'REST') {
            this.router.navigate([
                'home',
                this.routesCreated.departamento,
                this.routesCreated.lugar,
                'restaurantes',
                item.name_route
            ]).then(function () {
                window.location.reload();
            });
        }
        else {
            this.router.navigate([
                'home',
                this.routesCreated.departamento,
                this.routesCreated.lugar,
                'tours-experiencias',
                item.agenciadesc,
                item.name_route
            ]).then(function () {
                window.location.reload();
            });
        }
    };
    TourViewComponent.prototype.getTitleExperience = function () {
        var _a;
        var message = 'Hola, quiero reservar la siguiente experiencia: ';
        var name = ((_a = this.tourView) === null || _a === void 0 ? void 0 : _a.nombre) || 'Experiencia sin nombre';
        return message + name; // 🏔🍀
    };
    TourViewComponent.prototype.openReservationOptions = function () {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: '¿Cómo desea reservar?',
            showCancelButton: true,
            confirmButtonText: 'Por la Web',
            cancelButtonText: 'Por WhatsApp',
            customClass: {
                title: 'text-xl',
                confirmButton: 'bg-green-500 text-sm text-white hover:bg-green-600 px-4 py-2 rounded',
                cancelButton: 'bg-green-500 text-sm text-white hover:bg-green-600 px-4 py-2 rounded'
            }
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.openGoogleCalendarModal();
            }
            else if (result.dismiss === sweetalert2_1["default"].DismissReason.cancel) {
                _this.openWhatsAppLink();
            }
        });
    };
    TourViewComponent.prototype.openGoogleCalendarModal = function () {
        sweetalert2_1["default"].fire({
            html: '<iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39SoK7uLrHc0LgCZHY1BrMfS4-K4Ok5HuryGgwm6sAaY2PJJrsS6vg8RntEEQ7aPxj_MrFfEJp?gv=true" width="100%" height="500" frameborder="0"></iframe>',
            showCloseButton: true,
            showConfirmButton: false,
            padding: '0',
            customClass: {
                popup: 'w-full lg:w-[80%] '
            }
        });
    };
    TourViewComponent.prototype.openWhatsAppLink = function () {
        var titleExperience = this.getTitleExperience(); // Asegúrate de tener este método implementado
        var whatsappUrl = "https://wa.me/51900649509?text=" + encodeURIComponent(titleExperience);
        window.open(whatsappUrl, '_blank');
    };
    __decorate([
        core_1.ViewChild('googleCalendarButton', { static: false })
    ], TourViewComponent.prototype, "googleCalendarButton");
    TourViewComponent = __decorate([
        core_1.Component({
            selector: 'app-tour-view',
            standalone: true,
            imports: [common_1.NgFor, common_1.NgIf],
            templateUrl: './tour-view.component.html',
            styleUrl: './tour-view.component.scss',
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], TourViewComponent);
    return TourViewComponent;
}(BaseComponents_1.BaseComponenst));
exports.TourViewComponent = TourViewComponent;
