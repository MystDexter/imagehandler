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
  subPath = 'uploads/';
  imgSrc: any = '';
  imageList: any = [];

  constructor(private http: HttpClient) {}

  public ngOnInit() {
    this.readAllImages();
  }

  async processUpload(event) {
    console.log(event, event.target.files);
    const files = event.target.files;

    /*const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };*/

    // ajax call
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const url = 'http://localhost:3000/multi-upload';
      const formData = new FormData();
      formData.append('file', file);

      await this.http.post(url, formData).toPromise();

      this.readAllImages();
    }

    console.log("UPLOADED");
  }

  async readAllImages() {
    const url = 'http://localhost:3000/file-list';
    const results = await this.http.get(url).toPromise();

    this.imageList = results;
  }
}
