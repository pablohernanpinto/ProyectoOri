import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/guards/login.service';
import { ModificarConvenioComponent } from '../modificar-convenio/modificar-convenio.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  tuArrayDeConvenios: any;

  constructor(private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalComponent>,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: {Index: number},
    public toast: NgToastService,
    ) { } // Corregido aquí
 
  convenios: any;
  mostrarEnPantalla: any;
  indexEnviar: number | undefined;

  closeDialog() {
    this.dialogRef.close('');
  }

  ngOnInit() {
    this.hacerPeticion();

  }

  hacerPeticion() {
    const url = 'https://localhost:7230/api/Convenio/';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;

      this.indexEnviar = this.data.Index
      const convenioConsultado = this.convenios.find((convenio: any) => convenio.iD_Convenio === this.data.Index);

      this.mostrarEnPantalla = convenioConsultado;
    });
  }

  delete() {
    this.http.delete('https://localhost:7230/api/Convenio/'+this.mostrarEnPantalla.iD_Convenio)
    .subscribe();
    this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
    alert('SE BORRÓ EL CONVENIO');
    window.location.reload();
  }  

  ModConvenio() {

  const dialogRef = this.dialog.open(ModificarConvenioComponent,{data: {formulario:this.mostrarEnPantalla,Index: this.indexEnviar}});
  
  }  
}
