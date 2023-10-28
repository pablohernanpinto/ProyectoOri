import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router,private renderer: Renderer2, @Inject(DOCUMENT) private document: Document){ }



  ngOnInit(){
    this.renderer.setStyle(this.document.body, 'background-color', '#253e85');
  }

  imagePath = "../../elements/ori.png"


  Login(){
    this.router.navigate(['/page']);
    console.log(this.router.url);
  }
}
