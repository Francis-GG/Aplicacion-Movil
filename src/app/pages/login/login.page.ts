import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading : HTMLIonLoadingElement;

  constructor(private loadingCtrl:LoadingController) {}

  cargarLoading(message: string){
    this.presentLoanding(message);

    setTimeout(() => {
      this.loading.dismiss();
    }, 3000);
  }

  async presentLoanding(message: string){
    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();
  }

  ngOnInit(){
    this.cargarLoading('Bienvenido a TeLlevoApp');
    console.log('ngOnInit');
  }
}
