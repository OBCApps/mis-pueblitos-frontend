import { Injectable } from '@angular/core';
import { API_SERVICE_WEB } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  private API_SERVICE = API_SERVICE_WEB + '/chatbot2';

  constructor(
    private http: HttpClient,
  ) { }

  get_messagechatbot(data: any): Observable<any> {
    return this.http.post<any>(this.API_SERVICE + '/message', data).pipe(
      map((response) => { return response })
    );
  }

 

}
