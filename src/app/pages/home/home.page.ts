import { Component, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
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
  constructor(private loadingCtrl: LoadingController, private personaService: PersonasService, private alertCtrl: AlertController, private modalCtrl:ModalController,private toastCtrl:ToastController) {
    this.getPersonas();
    
  }

  async showLoading() {
    this.loadingElement = await this.loadingCtrl.create({
      message: 'Cargando Conductores...',
      cssClass: 'custom-loading'
    });
    this.loadingElement.present();
    
  }

  getPersonas(): void {
    this.showLoading()
    this.personaService.getPersonas().subscribe(respuesta => {
      console.log(respuesta);
      this.listadoPersona = respuesta;
      this.loadingElement.dismiss();
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

  async addPersona() {
    const alert = await this.alertCtrl.create({
      header:'Add Person',
      inputs: [
        {
          name:'name',
          type:'text',
          placeholder:'Name'
        },
        {
          name:'lastname',
          type:'text',
          placeholder:'Lastname',
        },
        {
          name:'patente',
          type:'text',
          placeholder:'Patente'
        },
        {
          name:'carmodel',
          type:'text',
          placeholder:'Auto',
        },
        {
          name:'email',
          type:'email',
          placeholder:'correo@correo.com'
        },
        {
          name:'image',
          type:'url',
          placeholder:'link web image'
        },
      ],
      buttons: [
        {
          text:'Cancel',
          role:'cancel',
        },
        {
          text:'Save',
          role:'confirm',
          handler: (data) => {
            this.personaService.addPersona(data);
            this.toastPresent('Conductor añadido.'); 
          }
        }
      ]
      });
      await alert.present();
    }

    async toastPresent(message:string){
      const toast = await this.toastCtrl.create({
        message:message,
        duration:1000,
      })
      toast.present();
    }

}
