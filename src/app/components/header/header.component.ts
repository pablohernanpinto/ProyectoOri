import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddComComponent } from '../modals/add-com/add-com.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ModalADD() {
    const dialogRef = this.dialog.open(AddComComponent);
  }

  goMainPage() {
    this.router.navigate(['/page']);
    console.log(this.router.url);
  }
}
