import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { process } from '../../../../environments/environment';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  ISLOGGED: Boolean = false;
  subscription: Subscription;
  panelOpenState = false;
  TITULO_TOOLBAR: string = process.env.TITULO_TOOLBAR;
  ID: string;

  perfiles: any = [{
    id: 1,
    name: 'USUARIOS',
    icon: 'groups',
    servicios: [{
      id: 1,
      name: 'Ver Usuarios',
      ruta: '/usuarios/listar'
    }, {
      id: 2,
      name: 'Crear Usuarios',
      ruta: '/usuarios/crear'
    }]
  }, {
    id: 2,
    name: 'INSTANCIAS',
    icon: 'computer',
    servicios: [{
      id: 3,
      name: 'Ver Instancias',
      ruta: '/instances',
      icon: 'home',
      total: 3
    }, {
      id: 4,
      name: 'Encender/Apagar Instancias',
      ruta: '/instances',
      icon: 'home',
      total: 6
    }, {
      id: 5,
      name: 'Horario Instancias',
      ruta: '/instances',
      icon: 'home',
      total: 23
    }]
  }];

  constructor( private auth: AuthService,
               private router: Router) {

  }

  ngOnInit(): void {

    this.subscription = this.auth.getUserData().subscribe(data => {
      this.ID = data.ID;
      this.ISLOGGED = data.ISLOGGED;
      this.cargarPerfiles();
    });

  }

  miInformacion() {

    this.router.navigate(['/usuarios/detalle'], {queryParams: {ID: this.ID}});

  }

  cargarPerfiles() {

    console.log(this.ID);

  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}
