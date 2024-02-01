import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
