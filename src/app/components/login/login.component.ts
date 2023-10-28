import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/guards/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private loginService: LoginService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.document.body, 'background-color', '#253e85');
  }

  imagePath = '../../elements/ori.png';

  Login() {
    let user = this.loginService.login(
      this.form.value.username,
      this.form.value.password
    );
    if (!user){
      alert('El usuario o la contraseña no son correctos');
    }else{
      this.router.navigateByUrl('/page');
    }
  }
}
