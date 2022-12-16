import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Component, Input } from '@angular/core';
import {  ModalController, ToastController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Persona } from 'src/app/services/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { ModalPage } from '../modal/modal.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  constructor(
    private personaService: PersonasService,  
    private modalCtrl:ModalController,
    private toastCtrl:ToastController,
    private formBuilder:FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router ) { }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  get email(){
    return this.credentials?.get('email');
  }

  get password(){
    return this.credentials?.get('password');
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present()
    const user = await this.authService.login(this.credentials.value.email,this.credentials.value.password);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }
    else {
      this.alertPresent('Login Error','Datos ingresados incorrectos.');
    }
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present()
    const user = await this.authService.register(this.credentials.value.email,this.credentials.value.password);
    await loading.dismiss();

    if (user){
      this.addPersona(user.providerId);
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }
    else {
      this.alertPresent('Register Error','Datos ingresados incorrectos.');
    }
  }

  async alertPresent(header:string,mesagge:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:mesagge,
      buttons:['OK'],
    });
    await alert.present();
  }

  async addPersona(userID) {
    const alert = await this.alertCtrl.create({
      header:'Ingrese sus datos.',
      inputs: [
        {
          name:'email',
          type:'text',
          placeholder:'email@example.com'
        },
        {
          name:'tipousuario',
          type:'text',
          placeholder:'pasajero/conductor'
        },
        {
          name:'comuna',
          type:'text',
          placeholder:'Comuna de destino.',
        },
        {
          name:'image',
          type:'url',
          placeholder:'link web image'
        },
      ],
      buttons: [
        {
          text:'Save',
          role:'confirm',
          handler: (data) => {
            this.personaService.addPersona(data);
            this.toastPresent('Sus datos han sido ingresados.'); 
          }
        }
      ]
      });
      await alert.present();
    }

    async toastPresent(message:string){
      const toast = await this.toastCtrl.create({
        message:message,
        duration:2000,
      })
      toast.present();
    }

}
