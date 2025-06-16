import { Component } from '@angular/core';
import { DwLanguageService } from '@webdpt/framework/language';
import { NzIconService } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    langService: DwLanguageService,
    private iconService: NzIconService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/c/font_4780329_re1io0pxvb.js',
    });
  }
}
