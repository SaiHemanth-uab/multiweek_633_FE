import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menuservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public menuService: MenuService, public router: Router) {}
  selectedFile: File | null = null;
  emailsList = '';
  ngOnInit() {}

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.selectedFile = inputElement.files[0];
    }
  }
  onSendSubscription() {
    console.log('fffffff');
    if (this.emailsList && this.emailsList.includes(',')) {
      const emails = this.emailsList.split(',');
      if (emails.length > 5) {
        alert('Please enter upto 5 Emails');
      } else {
        console.log('emails', emails);
        this.menuService.onSendSubscriptions(emails).subscribe({
          next: (res: any) => {
            console.log(res);
            alert('Sent Subscription requests!');
          },
          error: (error: any) => {
            console.log(error);
          },
        });
        console.log(emails);
      }
    } else {
      console.log('emails', [this.emailsList]);
      this.menuService.onSendSubscriptions([this.emailsList]).subscribe({
        next: (res: any) => {
          console.log(res);
          alert('Sent Subscription requests!');
        },
        error: (error: any) => {
          console.log(error);
        },
      });
      console.log(this.emailsList);
    }
  }
  onUploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.menuService.onSendFileToBucket(formData).subscribe({
        next: (result: any) => {
          alert('File uploaded successfully');
          console.log(result);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
