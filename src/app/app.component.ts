import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
<<<<<<< HEAD
    { title: 'Cerrar Sesión', url: '', icon: 'log-out' },
=======
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'About', url: '/about', icon: 'warning' },
>>>>>>> 6b917cb03559ac47fe90d6d050ff832aedfb1855
  ];
  constructor() {}
}
