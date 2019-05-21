import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
      const preloadeds = document.querySelectorAll<HTMLElement>('.preloader');
      preloadeds.forEach((element) => {
          element.classList.remove('preloader');
      });
  }
}
