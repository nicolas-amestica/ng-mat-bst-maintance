import { Router } from '@angular/router';
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

  onlyReadCheck: boolean;
  isChecked: boolean;
  resultDialog: number;
  barLoading = false;

  constructor( private instanciaService: InstanciaService,
               private dialog: MatDialog,
               private router: Router ) { }

  ngOnInit(): void { 

    if (this.instancia.State.Code == 16) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

  }

  onChange(event, instanciaId) {

    this.onlyReadCheck = true;
    this.barLoading = true;
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
            this.barLoading = false;
          }, (err) => {
            Swal.fire({
              icon: 'warning',
              title: 'Instancia EC2',
              text: err.error.err.message
            });
            this.onlyReadCheck = false;
            this.barLoading = false;
          });
        }, 30000);
      }, (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Instancia EC2',
          text: err.error.err.message
        });
        this.barLoading = false;
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
                this.barLoading = false;
              }, (err) => {
                Swal.fire({
                  icon: 'warning',
                  title: 'Instancia EC2',
                  text: err.error.err.message
                });
                this.onlyReadCheck = false;
                this.barLoading = false;
              });
            }, 30000);
          }, (err) => {
            Swal.fire({
              icon: 'warning',
              title: 'Instancia EC2',
              text: err.error.err.message
            });
            this.barLoading = false;
          });
        } else {
          this.isChecked = true;
          this.onlyReadCheck = false;
          this.barLoading = false;
        }

      });
    }
  
  }

  verDetalle(instanceId): void {

    this.router.navigate( ['/instance', instanceId] )

  }

  restartInstance(instanceId): void {

    const dialogRef = this.dialog.open(DialogComponent, { data: { type: 'delete', titulo: 'Instancia', message: `¿Está seguro que desea reiniciar la instancia?`, detalle: `Nombre de instancia: ${instanceId}`,  btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });
    dialogRef.afterClosed().subscribe(result => {
      this.resultDialog = result;
      if (this.resultDialog == 1) {
        console.log("Reiniciar");
      }
    });

  }

}