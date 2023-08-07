import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menuservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  constructor(
    public menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    let url = this.router.url.split('download')[1].split('_path_');

    let payload = {
      url:
        `https://smaremal.s3.us-east-2.amazonaws.com/` +
        this.router.url.split('download')[1].split('_path_')[1],
      userId: url[0].replace('token%3D', '').replace('/', ''),
    };
    this.menuService.onCheckUpdateClick(payload).subscribe({
      next: (response: any) => {
        if (response.data == true) {
          this.downloadFile(payload.url);
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    console.log(payload);
  }
  downloadFile(url: string) {
    // Create a hidden anchor element

    const anchor = document.createElement('a');
    anchor.style.display = 'none';

    // Set the URL as the href attribute
    anchor.href = url;

    // Add the anchor to the document
    document.body.appendChild(anchor);
    console.log(anchor);
    // Simulate a click event on the anchor to trigger the download
    anchor.click();

    // Clean up: remove the anchor from the document
    document.body.removeChild(anchor);
  }
}
