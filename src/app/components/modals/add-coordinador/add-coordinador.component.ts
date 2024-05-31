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
    idInstitucion: '',
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
      this.formulario.value.idInstitucion = this.idInstituciones[this.optionsInstituciones.indexOf(String(this.formulario.value.nombre_institucion))]
      if(this.formulario.value.tipo == 'Interno'){
        this.formulario.value.nombre_institucion = 'Univesidad Catolica Del Maule'
        this.formulario.value.idInstitucion = '1'
      }
       this.http.post('https://localhost:7230/api/Coordinador', this.formulario.value).subscribe(
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
    const url = 'https://localhost:7230/api/Institucion/nombresInstituciones';
    this.http.get(url).subscribe((data: any) => {
      console.log(data)
      this.convenios = data;
      if (Array.isArray(this.convenios)) {
        for (let i = 0; i < this.convenios.length; i++) {
          this.optionsInstituciones.push(this.convenios[i].nombre_Institucion)
          this.idInstituciones.push(this.convenios[i].id_Institucion)
        }
      }
    });
  }
}
