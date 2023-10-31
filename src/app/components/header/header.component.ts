import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddComComponent } from '../modals/add-com/add-com.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/guards/login.service';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService,
    private http: HttpClient,
    private envioServicio: ModalService
    ) {}
  
  convenios: any;
  busqueda:string  = '';

  
  ModalADD() {

    const dialogRef = this.dialog.open(AddComComponent);
  }

  goMainPage() {
    this.router.navigate(['/page']);
    console.log(this.router.url);
  }
  logout() {
    this.loginService.logout(); // Llama al método logout del servicio
  }
  
  enviarMensaje(){
    //console.log(this.busqueda)
    this.envioServicio.disparadorDeBusqueda.next({mensaje:this.busqueda})
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;

    });
  }
}

