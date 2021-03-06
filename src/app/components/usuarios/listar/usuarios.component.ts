import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuario.model';

import { DialogComponent } from '../../comun/dialog/dialog.component';

import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  titulo = 'Usuarios';
  usuarios: UsuarioModel[] = [];
  value: string;
  spinner = true;

  constructor( private usuarioService: UsuarioService,
               private router: Router,
               public dialog: MatDialog) {

    this.listarUsuarios();

  }

  ngOnInit(): void { }

  listarUsuarios(): void {

    this.usuarioService.listarUsuarios().subscribe((users) => {
      this.usuarios = users;
      this.spinner = false;
    }, (err) => {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso no autorizado',
        text: err.error.message
      });
      this.spinner = false;
    });

  }

  eliminarUsuario() {

    this.dialog.open(DialogComponent);

  }

  verDetalle(usuario: UsuarioModel) {

    // this.router.navigate(['/usuarios/detalle', usuario.rut]);
    this.router.navigate(['/usuarios/detalle'], {queryParams: {rut: usuario.ID}});

  }

  onChange(value, usuario) {
 
    usuario.ESTADO = value ? true : false;

  }

}
