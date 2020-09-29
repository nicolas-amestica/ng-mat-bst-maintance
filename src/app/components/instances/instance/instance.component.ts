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
  titulo: string = "INFORMACIÓN";
  resultDialog: number;

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
      this.openDialog(err.error.error, err.error.err.message, err.error.err.code);
      this.spinner = false;
    });

  }

  terminateInstance(instanceId): void {

    const dialogRef = this.dialog.open(DialogComponent, { data: { type: 'delete', titulo: 'Instancia', message: `¿Está seguro que desea terminar la instancia?`, detalle: `Nombre de instancia: ${instanceId}`,  btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });
    dialogRef.afterClosed().subscribe(result => {
      this.resultDialog = result;
      if (this.resultDialog == 1) {
        console.log("terminar");
      }
    });

  }

  openDialog(message, detalle, code): void {

    const dialogRef = this.dialog.open(DialogComponent, { data: { type: 'confirm', titulo: 'Instancia', message: `${message}`, detalle: `${detalle} - ${code}`,  btnCancel: 'Cancelar', btnSuccess: 'Aceptar' } });

  }

}
