import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent {
  convenios: any;
  constructor(private router: Router,private http: HttpClient,public dialog: MatDialog,public dialogRef: MatDialogRef<AddComComponent>) { }
  selectedOption: number | undefined;


  ngOnInit() {
    this.hacerPeticion();
  }

  lista = [
  {Nombre_Institucion: ' Centro de Investigación Energética'},
  {Nombre_Institucion2: ' Centro de Investigación Energética'}
  ]

  options = [];




  formulario = {
    nombreInstitucion: '',
    unidadAcademica: '',
    pais: '',
    alcance: '',
    tipoInstitucion: '',
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
      alert("SE A INGRESADO EL CONVENIO");
      console.log(this.formulario);
    } else {
      alert("INGRESO NO VALIDO");
    }
  }

  
  closeDialog() {
    this.dialogRef.close('');
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/nombresInstituciones/';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      console.log(this.convenios.length)});
      this.options = this.convenios.map((label: any, index: number) => ({ label, value: index + 1 }));

  }

}



