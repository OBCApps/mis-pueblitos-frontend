import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, map } from "rxjs";

@Injectable({
    providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class ModalFiltrosService {
    constructor(
        private http: HttpClient,
    ) { }

    private modalService = new Subject<any>();
    modalState$ = this.modalService.asObservable();
    activateModal(option: any) {
        this.modalService.next(option);
    }

}