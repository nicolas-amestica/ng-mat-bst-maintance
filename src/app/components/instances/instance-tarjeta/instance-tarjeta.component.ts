import { InstanciaModel } from 'src/app/models/instancia.model';
import { Component, Input, OnInit } from '@angular/core';
import { InstanciaService } from './../../../services/instancia/instancia.service';
import Swal from 'sweetalert2';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../comun/dialog/dialog.component";

@Component({
  selector: 'app-instance-tarjeta',
  templateUrl: './instance-tarjeta.component.html',
  styleUrls: ['./instance-tarjeta.component.css']
})
export class InstanceTarjetaComponent implements OnInit {

  @Input() instancia: InstanciaModel = {};
  @Input() index: number;

  onlyReadCheck: boolean;
  isChecked: boolean;
  resultDialog: number;
  // selectedVal: string;

  constructor( private instanciaService: InstanciaService,
               private dialog: MatDialog ) { }

  ngOnInit(): void { 

    if (this.instancia.State.Code == 16) {
      // this.selectedVal = "Encendida";
      this.isChecked = true;
    } else {
      // this.selectedVal = "Apagada";
      this.isChecked = false;
    }

  }

  onChange(event, instanciaId) {

    this.onlyReadCheck = true;
    this.cambiarEstadoInstancia(event, instanciaId);

  }

  cambiarEstadoInstancia(estado, instanciaId): void {

    if (estado.checked) {
      this.instanciaService.encenderInstancia(instanciaId).subscribe((inst1) => {
        this.instancia.State.Code = inst1['Code'];
        this.instancia.State.Name = inst1['Name'];
        setTimeout(() => {
          this.instanciaService.describeStatus(instanciaId).subscribe((ReInst1) => {
            this.instancia.State.Code = ReInst1.State['Code'];
            this.instancia.State.Name = ReInst1.State['Name'];
            this.onlyReadCheck = false;
          }, (err) => {
            Swal.fire({
              icon: 'warning',
              title: 'Instancia EC2',
              text: err.error.err.message
            });
            this.onlyReadCheck = false;
          });
          // this.selectedVal = "Encendida";
        }, 30000);
      }, (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Instancia EC2',
          text: err.error.err.message
        });
        // this.selectedVal = "Apagada";
      });
    } else {
      const dialogRef = this.dialog.open(DialogComponent, { data: { type: 'delete', titulo: 'Instancias', message: `¿Está seguro que desea aplicar apagar la instancia`, btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });
      dialogRef.afterClosed().subscribe(result => {
        this.resultDialog = result;
        if (this.resultDialog == 1) {
          this.instanciaService.apagarInstancia(instanciaId).subscribe((inst) => {
            this.instancia.State.Code = inst['Code'];
            this.instancia.State.Name = inst['Name'];
            setTimeout(() => {
              this.instanciaService.describeStatus(instanciaId).subscribe((ReInst) => {
                this.instancia.State.Code = ReInst.State['Code'];
                this.instancia.State.Name = ReInst.State['Name'];
                this.onlyReadCheck = false;
              }, (err) => {
                Swal.fire({
                  icon: 'warning',
                  title: 'Instancia EC2',
                  text: err.error.err.message
                });
                this.onlyReadCheck = false;
              });
              // this.selectedVal = "Apagada";
            }, 30000);
          }, (err) => {
            Swal.fire({
              icon: 'warning',
              title: 'Instancia EC2',
              text: err.error.err.message
            });
            // this.selectedVal = "Encendida";
          });
        } else {
          this.isChecked = true;
          this.onlyReadCheck = false;
          // this.selectedVal = "Encendida";
        }

      });
    }

    // if (this.instancia.State.Code == 16) {
    //   this.selectedVal = "Encendida";
    // } else {
    //   this.selectedVal = "Apagada";
    // }

  }

  // openDialog(): void {

  //   const dialogRef = this.dialog.open(DialogComponent, { data: { type: 'delete', titulo: 'Instancias', message: `¿Está seguro que desea aplicar apagar la instancia` } });

  //   dialogRef.afterClosed().subscribe(result => {
  //     return result;
  //   })

  // }

}