import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServicesActivitiesServices {
    private tipoServicioSubject = new BehaviorSubject<string>('TOUR');
    tipoServicio$ = this.tipoServicioSubject.asObservable();

    constructor() { }

    setTipoServicio(tipo: string): void {
        this.tipoServicioSubject.next(tipo);
    }

    getTipoServicio(): string {
        return this.tipoServicioSubject.value;
    }
}
