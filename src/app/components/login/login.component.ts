import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router ) {

    this.crearFormulario();

    if (localStorage.getItem('rut')) {
      this.usuario.ID = localStorage.getItem('ID');
      this.recordarme = true;
    }

    this.cargarDataAlFormulario();

  }

  get rutNoValida() {
    return this.forma.get('ID').invalid && this.forma.get('ID').touched;
  }

  get claveNoValida() {
    return this.forma.get('CLAVE').invalid && this.forma.get('CLAVE').touched;
  }

  ngOnInit(): void {

    this.salir();

  }

  crearFormulario() {

    this.forma = this.fb.group({
      ID        : [ '', [Validators.required] ],
      CLAVE     : [ '', [Validators.required, Validators.minLength(4)] ],
      recordar  : [ ]
    });

  }

  login() {

    if (this.forma.invalid) {
      return Object.values (this.forma.controls).forEach( control => {
        control.markAsTouched();
      });

    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Autenticación de usuario',
      text: 'Validando, espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.forma.value).subscribe( resp => {

      if (this.forma.controls.recordar.value) {
        localStorage.setItem('ID', this.forma.controls.ID.value);
      }

      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'warning',
        title: 'Autenticación de usuario',
        text: err.error.message
      });

    });

  }

  cargarDataAlFormulario() {

    this.forma.reset({
      ID         : this.usuario.ID,
      CLAVE      : 'Blutengel1',
      recordar   : this.recordarme
    });

  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}
