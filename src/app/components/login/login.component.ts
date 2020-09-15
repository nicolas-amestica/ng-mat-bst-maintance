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
      this.usuario.rut = localStorage.getItem('rut');
      this.recordarme = true;
    }

    this.cargarDataAlFormulario();

  }

  get rutNoValida() {
    return this.forma.get('rut').invalid && this.forma.get('rut').touched;
  }

  get claveNoValida() {
    return this.forma.get('clave').invalid && this.forma.get('clave').touched;
  }

  ngOnInit(): void {

    this.salir();

  }

  crearFormulario() {

    this.forma = this.fb.group({
      rut     : [ '', [Validators.required] ],
      clave     : [ '', [Validators.required, Validators.minLength(4)] ],
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
        localStorage.setItem('rut', this.forma.controls.rut.value);
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
      rut      : this.usuario.rut,
      clave      : 'Blutengel1',
      recordar   : this.recordarme
    });

  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}
