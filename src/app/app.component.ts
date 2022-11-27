import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'paper-plane' },
    { title: 'Clima', url: 'clima', icon: 'cloud' },
    { title: 'Conversor', url: 'conversor', icon: 'cash' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out' },
    { title: 'About', url: 'about', icon: 'warning' },
  ];
  constructor() {}
}
