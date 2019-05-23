import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
      const preloader = document.querySelectorAll<HTMLElement>('.preloader');
      preloader.forEach((element) => {
          element.classList.remove('preloader');
      });
  }
}
