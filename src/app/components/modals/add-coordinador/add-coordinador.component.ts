import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-coordinador',
  templateUrl: './add-coordinador.component.html',
  styleUrls: ['./add-coordinador.component.css']
})
export class AddCoordinadorComponent {
  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient) { }

  convenios: any;
  optionsInstituciones: string[] = []; 
  idInstituciones: string[] = []; 
  selectedIndex: number | undefined;
  tipoCord: string[] = ['Interno', 'Externo'];

  formulario = {
    id_institucion: '',
    tipo: '',
    nombre: '',
    correo: '',
  };

  ngOnInit() {
    this.hacerPeticion();
  }

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();
  }

  addConvenio(formContact: NgForm) {
    if (formContact.valid) {

      this.formulario.id_institucion = this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.id_institucion)]


      console.log(this.formulario,'test')
      this.http.post('http://localhost:3000/api/coordinadores', this.formulario).subscribe(
          (data) => {
            alert('SE HA INGRESADO COORDINADOR');
            window.location.reload();
          },
          (error) => {
            alert('ERROR AL INGRESAR COORDINADOR');
            console.error(error);
            window.location.reload();
          }
        );
    } else {
      alert('INGRESO NO VALIDO');
    }
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/';
    this.http.get(url+'nombresInstituciones/').subscribe((data: any) => {
      this.convenios = data;
      if (Array.isArray(this.convenios)) {
        for (let i = 0; i < this.convenios.length; i++) {
          this.optionsInstituciones.push(this.convenios[i].Nombre_Institucion)
          this.idInstituciones.push(this.convenios[i].ID_Institucion)
        }
      }
    });
  }
}
