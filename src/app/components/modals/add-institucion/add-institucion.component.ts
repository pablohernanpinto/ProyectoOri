import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-institucion',
  templateUrl: './add-institucion.component.html',
  styleUrls: ['./add-institucion.component.css']
})
export class AddInstitucionComponent {

  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient) { }

  formulario = {
    nombre_inst: '',
    unidad_academica: '',
    pais: '',
    alcance: '',
    tipo_institucion: '',
  };

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  addConvenio(formContact: NgForm) {
    if (this.formulario.pais !== 'Chile'){
      this.formulario.alcance = 'Internacional'
    }
    else{
      this.formulario.alcance = 'Nacional'
    }

    if (formContact.valid) {
      console.log(this.formulario,'test')
      this.http.post('http://localhost:3000/api/instituciones', this.formulario).subscribe(
          (data) => {
            alert('CONVENIO INGRESADO');
          //  window.location.reload();
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
}


/* 
          {
        "id": 1,
        "Nombre_Institucion": "Insitucion1",
        "Unidad_Academica": "Unidadacademica1",
        "Pais": "Pais",
        "Alcance": "Alcance1",
        "Tipo_Institucion": "Tipodeinstitucion"
            },
*/