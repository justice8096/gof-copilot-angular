import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [GridComponent, NgForOf, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  width = 30;
  height = 20;

  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang('en');
    this.translate.use('en');
    this.setTheme('en');
  }

  onLanguageChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const lang = target?.value;
  if (lang) this.changeLanguage(lang);
}

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.setTheme(lang);
  }

  private setTheme(lang: string) {
    document.documentElement.setAttribute('data-theme', lang);
  }
}