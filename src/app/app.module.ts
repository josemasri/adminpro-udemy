import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ===============
// Rutas
// ===============
import { APP_ROUTES } from './app.routes';

// =================
// Modulos
// =================
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';


// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// =================
// Componentes
// =================
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { SharedModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
