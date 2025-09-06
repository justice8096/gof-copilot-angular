// src/app/app.component.ts
import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  languages: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  gridWidth = 30;
  gridHeight = 20;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.setTheme('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.setTheme(lang);
  }

  private setTheme(lang: string) {
    document.documentElement.setAttribute('data-theme', lang);
  }
}