import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-coordinador',
  templateUrl: './add-coordinador.component.html',
  styleUrls: ['./add-coordinador.component.css']
})
export class AddCoordinadorComponent {
  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient,private formBuilder: FormBuilder) { }

  convenios: any;
  optionsInstituciones: string[] = []; 
  idInstituciones: string[] = []; 
  selectedIndex: number | undefined;


  formulario = this.formBuilder.group({
    id_institucion: '',
    tipo: '',
    nombre: '',
    correo: '',
    nombre_institucion:'',
  })

  ngOnInit() {
    this.hacerPeticion();
  }

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();
  }

  addCoordinador() {
    if (this.formulario.valid) {
      this.formulario.value.id_institucion = this.idInstituciones[this.optionsInstituciones.indexOf(String(this.formulario.value.nombre_institucion))]
      if(this.formulario.value.tipo == 'Interno'){
        this.formulario.value.nombre_institucion = 'Univesidad Catolica Del Maule'
        this.formulario.value.id_institucion = '1'
      }
       this.http.post('http://localhost:3000/api/coordinadores', this.formulario.value).subscribe(
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
