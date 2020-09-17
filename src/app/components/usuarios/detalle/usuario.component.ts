import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ValidadorService } from '../../../services/validadores/validador.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  titulo = 'Información';
  usuario: any;
  rut: string;
  forma: FormGroup;
  foto;
  spinner = true;

  constructor( private fb: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private usuarioService: UsuarioService,
               private validadores: ValidadorService) {

    this.crearFormulario();

    this.activatedRoute.queryParams.subscribe(params => {
      this.usuarioService.listarUsuariosByRut(params.rut).subscribe((user) => {
          this.rut = params.rut;
          this.usuario = user;
          this.cargarDataAlFormulario();
          this.spinner = false;
      }, (err) => {
        console.log(err);
      });

    });

  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apaternoNoValido() {
    return this.forma.get('apaterno').invalid && this.forma.get('apaterno').touched;
  }

  get amaternoNoValido() {
    return this.forma.get('amaterno').invalid && this.forma.get('amaterno').touched;
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid;
  }

  get pass2NoValido() {

    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {

    // this.usuario.unsubscribe();

  }

  crearFormulario() {

    this.forma = this.fb.group({
      email     : [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre    : [ '', [Validators.required] ],
      apaterno  : [ '', [Validators.required] ],
      amaterno  : [ '', [Validators.required] ],
      telefono  : [ '' ],
      foto      : [ '' ],
      pass1     : [ '', [Validators.minLength(8)] ],
      pass2     : [ '', [Validators.minLength(8)] ]
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });

  }

  cargarDataAlFormulario() {

    this.forma.reset({
      email     : this.usuario.email,
      nombre    : this.usuario.nombre,
      apaterno  : this.usuario.apaterno,
      amaterno  : this.usuario.amaterno,
      telefono  : this.usuario.telefono
    });

  }

  guardarDatos() {

    if (this.forma.invalid) {
      return Object.values (this.forma.controls).forEach( control => {

        control.markAsTouched();

      });

    }

    console.log(this.forma);

  }

}
