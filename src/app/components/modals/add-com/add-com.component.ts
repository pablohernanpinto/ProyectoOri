import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent {

  constructor(private router: Router,private http: HttpClient,public dialog: MatDialog,public dialogRef: MatDialogRef<AddComComponent>) { }
 

  ngOnInit() {
    this.hacerPeticion();
    //console.log(this.options)

  }
 

  options: string[] = []; 
  convenios: any[] = [];
  valorConvenios:string |undefined;
  valorNombre:string |undefined;
  valorConvenio:string |undefined;
  tipoDeFirma: string[] = ['Digital', 'Fisica'];


  formulario = {
    id_institucion: '',
    id_coordinador: '', 
    nombre_conv: '',
    tipo_conv: '',
    vigencia: '',
    ano_firma: '',
    tipo_firma: '',
    cupos: '',
    documentos: '',
  };
  
  addConvenio(formContact: NgForm) {
      if (formContact.valid) {
        console.log(this.formulario)
        this.http.post('http://localhost:3000/api/convenios', this.formulario).subscribe(
            (data) => {
              alert('CONVENIO INGRESADO');
              window.location.reload();
              console.log(data);
            },
            (error) => {
              alert('ERROR AL INGRESAR CONVENIO');
              console.error(error);
            }
          );
      } else {
        alert('INGRESO NO VALIDO');
      }
    }
  
    
  closeDialog() {
    this.dialogRef.close('');
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/nombresInstituciones/';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      if (Array.isArray(this.convenios)) {

        for (let i = 0; i < this.convenios.length; i++) {
          //this.options = this.convenios.map(convenio => {return { label: convenio.Nombre_Institucion};});
          console.log(this.convenios[i].Nombre_Institucion, 'aqui')
          this.options.push(this.convenios[i].Nombre_Institucion)
        }
        console.log(this.options)
      }
    });
  }

}



