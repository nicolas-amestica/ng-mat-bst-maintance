import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULOS
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material Módulo
import { MaterialModule } from './material/material.module';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { InstancesComponent } from './components/instances/instances.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { UsuarioComponent } from './components/usuarios/detalle/usuario.component';
import { UsuariosComponent } from './components/usuarios/listar/usuarios.component';
import { SnackComponent } from './components/comun/snack/snack.component';
import { DialogComponent } from './components/comun/dialog/dialog.component';
import { UsuarioCrearComponent } from './components/usuarios/crear/usuario-crear.component';
import { InstanceTarjetaComponent } from './components/instances/instance-tarjeta/instance-tarjeta.component';

@NgModule({
  declarations: [
    AppComponent,
    InstancesComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    SideMenuComponent,
    UsuarioComponent,
    UsuariosComponent,
    SnackComponent,
    DialogComponent,
    UsuarioCrearComponent,
    InstanceTarjetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents:[DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
