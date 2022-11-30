import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Persona } from 'src/app/services/persona';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string = '';
  persona: Persona = null;

  constructor(private personaService: PersonasService,private modalCtrl: ModalController, private toastCtrl:ToastController) { }

  ngOnInit() {
    this.getPersona();
  }

  getPersona(){
    this.personaService.getPersonaById(this.id).subscribe(respuesta => {
      this.persona = respuesta;
    });
  }


  async updatePersona(){
    this.personaService.updatePersona(this.persona);
    this.modalCtrl.dismiss();
    this.toastPresent('Asiento reservado.');
  }

  async deletePersona() {
    this.personaService.deletePersona(this.persona);
    this.modalCtrl.dismiss();
    this.toastPresent('Conductor eliminado.');
  }

  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000,
    })
    toast.present();
  }

}
