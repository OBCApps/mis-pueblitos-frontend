import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('location');
  title$ = this.titleSubject.asObservable();

  setTitle(newTitle: string): void {
    this.titleSubject.next(newTitle);
  }
}
export class RoutesCreated {
  departamento : string;
  lugar : string;
  action : string; // tips-viajero / festividades / servicios / etc

  agencia_name : string;
  hotel_name : string
  restaurante_name : string;
  tour_name : string;
  atractivo_name : string;
}