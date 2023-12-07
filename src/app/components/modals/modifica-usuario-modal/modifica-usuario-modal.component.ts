import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/guards/login.service';

@Component({
  selector: 'app-modifica-usuario-modal',
  templateUrl: './modifica-usuario-modal.component.html',
  styleUrls: ['./modifica-usuario-modal.component.css']
})
export class ModificaUsuarioModalComponent {
  Informacion: any;
  
  constructor(
    public dialogRef: MatDialogRef<AddComComponent>,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: {data: any},

    ) { }

  formulario = this.formBuilder.group({
    email: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    vigencia: 'no',
    privilegios: '',

  })


  ngOnInit() {
    this.Informacion = this.data


  }

  closeDialog() {
    this.dialogRef.close('');

  }

  arregloEntrada(){

    /*     this.formulario.value.apellido = this.Informacion.Apellido */
    if (this.formulario.value.nombre == ''){
      this.formulario.value.nombre = this.Informacion.Nombre
    }
    if (this.formulario.value.apellido == ''){
      this.formulario.value.apellido = this.Informacion.Apellido
    }
    if (this.formulario.value.contrasena == ''){
      this.formulario.value.contrasena = this.Informacion.Contrasena
    }
    if (this.formulario.value.email == ''){
      this.formulario.value.email = this.Informacion.Email
    }
    if (this.formulario.value.privilegios == ''){
      this.formulario.value.privilegios = this.Informacion.Privilegios
    }

  }

  updateConvenio() {
    this.arregloEntrada()
      let url = 'http://localhost:3000/api/usuarios/'+String(this.Informacion.ID_Usuario)

  
  
      //console.log(this.formularioModificar.value)


        this.http.put(url,this.formulario.value).subscribe(
          (data) => {
            alert('SE HA ACTUALIZADO USUARIO');
            console.log(data);
            window.location.reload(); 
          },
          (error) => {
  
            console.error(error);
            alert('SE HA ACTUALIZADO USUARIO');
            window.location.reload(); 
          }
        );  
    }

}
