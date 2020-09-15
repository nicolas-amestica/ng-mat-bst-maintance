import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { InstancesComponent } from './components/instances/instances.component';
import { AuthGuard } from './guard/auth.guard';
import { UsuarioComponent } from './components/usuarios/detalle/usuario.component';
import { UsuariosComponent } from './components/usuarios/listar/usuarios.component';
import { UsuarioCrearComponent } from './components/usuarios/crear/usuario-crear.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'usuarios/detalle', component: UsuarioComponent, canActivate: [ AuthGuard ] },
  { path: 'usuarios/listar', component: UsuariosComponent, canActivate: [ AuthGuard ] },
  { path: 'usuarios/crear', component: UsuarioCrearComponent, canActivate: [ AuthGuard ] },
  { path: 'instances', component: InstancesComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
  { path: 'side-menu', component: SideMenuComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
