import { Component, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Persona } from 'src/app/services/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { ModalPage } from '../modal/modal.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loadingElement: HTMLIonLoadingElement;
  listadoPersona: Persona[] = [];
  listadoConductores: Persona[] = [];
  listadoPasajeros: Persona[] = [];
  constructor(private loadingCtrl: LoadingController, 
    private personaService: PersonasService, 
    private alertCtrl: AlertController, 
    private modalCtrl:ModalController,
    private toastCtrl:ToastController,
    private auth:Auth,
    private firestore:Firestore) {
    this.getUserProfile();
    this.getPersonas();
  }

  getUserProfile(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    this.toastPresent("Welcome " + user.email);
    return docData(userDocRef);
  }

  async showLoading() {
    this.loadingElement = await this.loadingCtrl.create({
      message: 'Cargando Conductores...',
      cssClass: 'custom-loading'
    });
    this.loadingElement.present();
  }

  getPersonas(): void {
    this.showLoading();
    this.personaService.getPersonas().subscribe(respuesta => {
      console.log(respuesta);
      this.listadoPersona = respuesta;
      this.loadingElement.dismiss();
    });
    this.listadoPersona.forEach(function (item, index) {
      if (item.tipousuario == "conductor") {
        this.listadoConductores.push(item);
      } else {
        this.listadoPasajeros.push(item);
      }
    })
  }

  async openDetailPersona(persona:Persona) {  
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: persona.id },
      breakpoints: [0,0.5,0.8],
      initialBreakpoint:0.5
    });
    modal.present();
  }


    async toastPresent(message:string){
      const toast = await this.toastCtrl.create({
        message:message,
        duration:2000,
      })
      toast.present();
    }

}
