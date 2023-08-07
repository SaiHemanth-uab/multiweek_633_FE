import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menuservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public menuService: MenuService, public router: Router) {}
  selectedFile: File | null = null;
  emailsList = '';
  isEmailEnetered = false;

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.selectedFile = inputElement.files[0];
    }
  }
  onSendSubscription() {
    this.isEmailEnetered = false;
    if (this.emailsList && this.emailsList.includes(',')) {
      const emails = this.emailsList.split(',');
      if (emails.length > 5) {
        alert('Please enter upto 5 Emails');
      } else {
        this.menuService.onSendSubscriptions(emails).subscribe({
          next: (res: any) => {
            this.isEmailEnetered = true;
            alert('Sent Subscription requests!');
            this.emailsList = '';
          },
          error: (error: any) => {
            console.log(error);
          },
        });
        console.log(emails);
      }
    } else {
      this.menuService.onSendSubscriptions([this.emailsList]).subscribe({
        next: (res: any) => {
          this.isEmailEnetered = true;
          alert('Sent Subscription requests!');
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
  onUploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.menuService.onSendFileToBucket(formData).subscribe({
        next: (result: any) => {
          this.emailsList = '';
          this.isEmailEnetered = false;
          alert('File uploaded successfully');
          this.selectedFile = null;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
