import { Component } from '@angular/core';
import { DataSharingService } from '../../all-convenios/data-sharing.service';
import { ModalService } from '../../header/modal.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/guards/login.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AllConveniosComponent } from '../../all-convenios/all-convenios.component';
import { AddComComponent } from '../add-com/add-com.component';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usuarios: any[] = [];

  
  constructor(
    public loginService: LoginService,
    public dialog: MatDialog,
    private http: HttpClient,
    private envioServicio: ModalService,
    private dataSharingService: DataSharingService,
    public dialogRef: MatDialogRef<AddComComponent>,
    public toast: NgToastService,
    ) { }

    

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  ngOnInit() {
    this.hacerPeticion();
  }

  delete(Id: number){
  console.log(Id)  

      this.http.delete('http://localhost:3000/api/usuarios/'+Id)
    .subscribe();
    this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
    alert('SE ELIMINO EL USUARIO');
    window.location.reload();
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/usuarios';
    this.http.get(url).subscribe((data: any) => {
      this.usuarios = data
    })
  }
}




