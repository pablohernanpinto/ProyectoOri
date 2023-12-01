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

/*   formulario = {
    email: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    vigencia: '',
    privilegios:'',
  }; */
  formulario = this.formBuilder.group({
    email: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    vigencia: 'no',
    privilegios: '',
  })



  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  addUsuarios() {
    if (this.formulario.valid) {
      this.http.post('http://localhost:3000/api/usuarios/register', this.formulario.value).subscribe(
          (data) => {
            alert('SE HA INGRESADO EL USUARIO');
            console.log(data);
            window.location.reload();

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


