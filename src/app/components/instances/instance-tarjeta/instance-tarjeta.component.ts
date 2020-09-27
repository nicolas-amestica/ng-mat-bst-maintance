import { InstanciaModel } from 'src/app/models/instancia.model';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { InstanciaService } from './../../../services/instancia/instancia.service';

@Component({
  selector: 'app-instance-tarjeta',
  templateUrl: './instance-tarjeta.component.html',
  styleUrls: ['./instance-tarjeta.component.css']
})
export class InstanceTarjetaComponent implements OnInit {

  @Input() instancia: any = {};
  @Input() index: number;

  constructor( private instanciaService: InstanciaService ) {
    // this.instanciaSeleccionada = new EventEmitter();
  }

  ngOnInit(): void { }

  onChange(value, instanciaId) {

    console.log(value, instanciaId);

    this.cambiarEstadoInstancia(value, instanciaId)

  }

  cambiarEstadoInstancia(estado, instanciaId): void {

    if (estado) {
      this.instanciaService.encenderInstancia(instanciaId).subscribe((instancia) => {
        this.instancia.State.Code = 16;
        this.instancia.State.Name = "Started";
        console.log(instancia);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.instanciaService.apagarInstancia(instanciaId).subscribe((instancia) => {
        this.instancia.State.Code = 50;
        this.instancia.State.Name = "Pendding";
        console.log(instancia);
      }, (err) => {
        console.log(err);
      });
    }

  }

}