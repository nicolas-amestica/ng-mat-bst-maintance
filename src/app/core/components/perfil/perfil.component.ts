import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() perfil: any = {};

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
      id: 1,
      name: 'Ver Instancias',
      ruta: '/instances',
      icon: 'home',
      total: 3
    }, {
      id: 2,
      name: 'Encender/Apagar Instancias',
      ruta: '/instances',
      icon: 'home',
      total: 6
    }, {
      id: 3,
      name: 'Horario Instancias',
      ruta: '/instances',
      icon: 'home',
      total: 23
    }]
  }];

  constructor() { }

  ngOnInit(): void { }

}
