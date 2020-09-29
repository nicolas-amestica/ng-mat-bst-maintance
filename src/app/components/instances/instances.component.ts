import { InstanciaModel } from 'src/app/models/instancia.model';
import { Component, OnInit } from '@angular/core';
import { InstanciaService } from './../../services/instancia/instancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
export class InstancesComponent implements OnInit {

  titulo = "Instancias";
  instancias: InstanciaModel[] = [];
  spinner = true;
  color = "primary";

  constructor( private instanciaService: InstanciaService) {

    this.listarInstancias();

  }

  ngOnInit(): void { }

  listarInstancias(): void {

    this.instanciaService.listarInstancias().subscribe((inst) => {
      this.instancias = inst;
      this.spinner = false;
    }, (err) => {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso no autorizado',
        text: err.error
      });
      this.spinner = false;
    });

  }

}
