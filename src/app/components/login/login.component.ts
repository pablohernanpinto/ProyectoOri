import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/guards/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    public loginService: LoginService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  data = {}

  formulario = {
    email: '',
    contrasena: '',
  };

  ngOnInit() {

    this.renderer.setStyle(this.document.body, 'background-color', '#253e85');
  }

  imagePath = '../../elements/ori.png';

  logout() {
    this.loginService.logout(); // Llama al método logout del servicio
  }
  loginVisita(){
    this.data = {
      ID_USUARIO: 9999,
      EMAIL: "visitante@admin",
      PRIVILEGIOS: "no"
      } 
    
    let user = this.loginService.login(this.data);
    if (!user){
      alert('El usuario o la contraseña no son correctos');
    }else{
      this.router.navigateByUrl('/page');
    }
  }

  login(formContact: NgForm) {


          this.data = {
            ID_USUARIO: 0,
            EMAIL: "rodrigo@admin.com",
            PRIVILEGIOS: "si"
            } 
          
          let user = this.loginService.login(this.data);
          if (!user){
            alert('El usuario o la contraseña no son correctos');
          }else{
            this.router.navigateByUrl('/page');
          }
/*     if (formContact.valid) {

      this.http.post('http://localhost:3000/api/usuarios/login', this.formulario).subscribe(
          (data) => {
          // Redirigir a la página principal después de un inicio de sesión exitoso
          this.data = data

          let user = this.loginService.login(data);
          if (!user){
            alert('El usuario o la contraseña no son correctos');
          }else{
            this.router.navigateByUrl('/page');
          }
        },
          (error) => {
            alert('Usuario invalido');
            console.error(error);
          }
        );
    } else {
      alert('INGRESO NO VALIDO');
    } */
}

}
