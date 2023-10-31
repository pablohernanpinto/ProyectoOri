import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  status: string | undefined;

  constructor(private http: HttpClient,public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public data: {Index: number}, public toast: NgToastService) { } // Corregido aquí
 
  convenios: any;
  mostrarEnPantalla: any;

  closeDialog() {
    this.dialogRef.close('');
  }

  ngOnInit() {
    this.hacerPeticion();
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      this.mostrarEnPantalla = (this.convenios[this.data.Index]);
     // console.log(this.mostrarEnPantalla.ID_Convenio)
    });
  }

  delete() {
    //console.log('http://localhost:3000/api/convenios/'+this.mostrarEnPantalla.ID_Convenio)
    this.http.delete('http://localhost:3000/api/convenios/'+this.mostrarEnPantalla.ID_Convenio)
    .subscribe(() => this.status = 'Delete successful');
    this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
    window.location.reload();
  }
  
}
