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
  delete = "delete";
  confirm = "confirm";

  constructor( private instanciaService: InstanciaService,
               private dialog: MatDialog,
               private router: Router ) { }

  ngOnInit(): void {

    // console.log(this.instancia);

    if (this.instancia.State.Code == 16) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

    if (this.instancia.State.Code == 48) {
      this.isChecked = false;
      this.onlyReadCheck = true;
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
      const dialogRef = this.dialog.open(DialogComponent, { data: { type: `${this.delete}`, titulo: 'Instancias', message: `¿Está seguro que desea apagar la instancia?`, detalle: `Nombre de instancia: ${instanciaId}`, btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });
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

    const dialogRef = this.dialog.open(DialogComponent, { data: { type: `${this.delete}`, titulo: 'Instancia', message: `¿Está seguro que desea reiniciar la instancia?`, detalle: `Nombre de instancia: ${instanceId}`,  btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });
    dialogRef.afterClosed().subscribe(result => {
      this.resultDialog = result;
      if (this.resultDialog == 1) {
        this.barLoading = true;
        this.instanciaService.rebootInstanceById(instanceId).subscribe((result) => {
          this.openDialog(result.message, `Nombre de instancia: ${instanceId}`, '', this.confirm);
          this.barLoading = false;
        }, (err) => {
          this.openDialog(err.error.error, err.error.err.message, err.error.err.code, this.confirm);
          this.barLoading = false;
        });
      } else {
        this.barLoading = false;
      }
    });

  }

  openDialog(message, detalle, code, type): void {

    const dialogRef = this.dialog.open(DialogComponent, { data: { type: `${type}`, titulo: 'Instancia', message: `${message}`, detalle: `${detalle} - ${code}`,  btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });

  }

}