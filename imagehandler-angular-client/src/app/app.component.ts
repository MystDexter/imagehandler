import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-client-file-upload';

  baseUrl = 'http://localhost:3000/';
  imgSrc: any = '';
  imageList: any = [];

  constructor(private http: HttpClient) {}

  public ngOnInit() {
    this.readAllImages();
  }

  async processUpload(event) {
    console.log(event, event.target.files);
    const file = event.target.files[0];

    /*const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };*/

    // ajax call
    const url = 'http://localhost:3000/file-upload';
    const formData = new FormData();
    formData.append('file', file);

    await this.http.post(url, formData).toPromise();

    this.readAllImages();
  }

  async readAllImages() {
    const url = 'http://localhost:3000/file-list';
    const results = await this.http.get(url).toPromise();

    this.imageList = results;
  }
}
