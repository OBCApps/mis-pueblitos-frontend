import { Signal, signal } from "@angular/core";
import { SwiperContainer } from "swiper/element";
import { SwiperOptions } from "swiper/types";

export class BaseComponenst {


    // -------------- SWIPERS COMPONENTS INITIALIZE  -------------- \\
    swipers = new Map<string, Signal<SwiperContainer | null>>();
    initializeSwiper(elementId: string, options: SwiperOptions) {
        if (typeof document !== 'undefined') {
            const swiperElemConstructor = document.getElementById(elementId);
            if (swiperElemConstructor) {
                const signalElement = signal<SwiperContainer | null>(null);
                Object.assign(swiperElemConstructor, options);
                signalElement.set(swiperElemConstructor as SwiperContainer);
                signalElement().initialize();
                this.swipers.set(elementId, signalElement);
            }
        }
    }
}