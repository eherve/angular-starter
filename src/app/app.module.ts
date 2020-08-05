import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler, MESSAGE_FORMAT_CONFIG } from 'ngx-translate-messageformat-compiler';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomIconService } from './_services/custom-icon.service';
import { mockBackendInterceptor } from './_mocks/mock-backend.interceptor';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { ToolbarModule } from './_components/toolbar/toolbar.module';

const locales = ['fr'];
const defaultLanguage = 'fr';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ToolbarModule,
    MatSidenavModule,
    ToolbarModule
  ],
  providers: [
    { provide: MESSAGE_FORMAT_CONFIG, useValue: { locales } },
    mockBackendInterceptor,
    AuthInterceptor,
    CustomIconService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
