import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrameworkModule } from '@webdpt/framework';
import { FrameworkUICoreModule } from '@webdpt/components/providers';
import { DwServiceWorkerModule } from '@webdpt/framework/service-worker';
import { DwDapModule } from '@webdpt/framework/dap';
import { DwProgramsModule } from '@webdpt/programs';
import { ImplementationModule } from './implementation/implementation.module';
import { SYSTEM_CONFIG } from './config/system-config';
import { SystemModule } from './config/system.module';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    /** ************* 端平台 ***************/
    FrameworkModule.forRoot([], SYSTEM_CONFIG),
    FrameworkUICoreModule.forRoot(),
    // ---------------------------------------------------------
    // | 選配
    // ---------------------------------------------------------
    // DwDapModule, // DAP平台
    // DwProgramsModule, // 平台作業

    SystemModule.forRoot([]),
    ImplementationModule.forRoot([]),
    // DwServiceWorkerModule.forRoot(60 * 60 * 1000, environment.production),
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
