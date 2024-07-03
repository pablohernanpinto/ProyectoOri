import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {


  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient,private formBuilder: FormBuilder) { }

  formulario = this.formBuilder.group({
    email: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    vigencia: 'no',
    privilegios: '',
  })

/* {
  "idUsuario": 0,
  "email": "string",
  "contrasena": "string",
  "nombre": "string",
  "apellido": "string",
  "vigencia": "string",
  "privilegios": "string"
} */



  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  addUsuarios() {
    /* 
/api/Usuario/register */
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      this.http.post('https://localhost:7230/api/Usuario/register', this.formulario.value).subscribe(
          (data) => {
            alert('SE HA INGRESADO EL USUARIO');
            console.log(data);
           // window.location.reload();

          },
          (error) => {
            alert('ERROR AL INGRESAR EL USUARIO');
            console.error(error);
          }
        );
    } else {
      alert('INGRESO NO VALIDO');
    }
  }
}


