import { Component, OnInit } from '@angular/core';
import { InstanciaService } from './../../../services/instancia/instancia.service';
import { InstanciaModel } from 'src/app/models/instancia.model';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../comun/dialog/dialog.component";

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.css']
})
export class InstanceComponent implements OnInit {

  instancia: InstanciaModel = {};
  instancaId: string;
  spinner = true;
  barLoading = false;
  titulo: string = "INFORMACIÓN";
  resultDialog: number;
  delete = "delete";
  confirm = "confirm";

  constructor( private activatedRoute: ActivatedRoute,
               private instanceService: InstanciaService,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.instancaId = params.id;
      this.getInstancia(this.instancaId);
    });

  }

  getInstancia(instanciaId) {

    this.instanceService.describeInstanceById(instanciaId).subscribe((inst) => {
      this.instancia = inst;
      this.spinner = false;
    }, err => {
      console.log(err);
      this.openDialog(err.error.error, err.error.err.message, err.error.err.code, this.confirm);
      this.spinner = false;
    });

  }

  terminateInstance(instanceId): void {

    const dialogRef = this.dialog.open(DialogComponent, { data: { type: `${this.delete}`, titulo: 'Instancia', message: `¿Está seguro que desea terminar la instancia?`, detalle: `Nombre de instancia: ${instanceId}`,  btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });
    dialogRef.afterClosed().subscribe(result => {
      this.resultDialog = result;
      if (this.resultDialog == 1) {
        this.barLoading = true;
        this.instanceService.terminateInstanceById(instanceId).subscribe((result) => {
          this.openDialog(result.message, `Nombre de instancia: ${instanceId}`, '', this.confirm);
          this.barLoading = false;
        }, err => {
          this.openDialog(err.error.error, err.error.err.message, err.error.err.code, this.confirm);
          this.barLoading = false;
        });
      } else {
        this.barLoading = false;
      }
    });

  }

  openDialog(message, detalle, code, type): void {

    const dialogRef = this.dialog.open(DialogComponent, { data: { type: 'confirm', titulo: 'Instancia', message: `${message}`, detalle: `${detalle} - ${code}`,  btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });

  }

}