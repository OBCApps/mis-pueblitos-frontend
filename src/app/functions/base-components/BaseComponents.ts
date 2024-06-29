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
                try {
                    const swiperInstance = signalElement();
                    if (swiperInstance) {
                        swiperInstance.initialize();
                        this.swipers.set(elementId, signalElement);
                    } else {
                        console.error("Error: swiperInstance es null");
                    }
                } catch (error) {
                    console.error("Error al inicializar el Swiper", error);
                }
            } else {
                console.error(`Elemento con id ${elementId} no encontrado`);
            }
        }
    }
}