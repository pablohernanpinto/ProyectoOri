import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/guards/login.service';
import { ModificaUsuarioModalComponent } from '../modifica-usuario-modal/modifica-usuario-modal.component';

@Component({
  selector: 'app-modifica-usuario',
  templateUrl: './modifica-usuario.component.html',
  styleUrls: ['./modifica-usuario.component.css']
})
export class ModificaUsuarioComponent {
  usuario:any
  constructor(
    public dialogRef: MatDialogRef<AddComComponent>,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    public dialog: MatDialog,
    ) { }



  
  ngOnInit() {
    this.hacerPeticion();
  }


  hacerPeticion() {
    const id = Number(this.loginService.getUserID());

    this.http.get('https://localhost:7230/api/Usuario/').subscribe((data: any) => {
      // Utiliza el método find para buscar el objeto con el ID_Usuario correspondiente
    const convenioConsultado = data.find((convenio: any) => convenio.idUsuario === id);
    
    this.usuario = convenioConsultado
    });
    
  }


  ModificarPerfil(){
    const dialogRef = this.dialog.open(ModificaUsuarioModalComponent,{data: this.usuario});
  }

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

}
