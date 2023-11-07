import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {


  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient) { }

  formulario = {
    email: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    vigencia: '',
    privilegios:'',
  };



  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  addUsuarios(formContact: NgForm) {
    if (formContact.valid) {
      this.http.post('http://localhost:3000/api/usuarios/register', this.formulario).subscribe(
          (data) => {
            alert('SE hA INGRESADO EL USUARIO');
            console.log(data);
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


