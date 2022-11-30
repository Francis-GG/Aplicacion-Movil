import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {
  loadingElement: HTMLIonLoadingElement;
  constructor(private climaService: ClimaService, 
              private loadingCtrl: LoadingController) { }

  results = null;
  latitude = 0;
  longitude = 0;

  ngOnInit() {
      this.showLoading();
      navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.climaService.getClimaData(this.latitude, this.longitude).subscribe((res) => {
        this.results = res;
        this.funcionClima();
        this.loadingElement.dismiss();
       });
    });

  }

  funcionClima(){
    let ciudad = document.getElementById('ciudad');
    let temperatura = document.getElementById('temperatura');
    let humedad = document.getElementById('humedad');
    let sensacion_termica = document.getElementById('sensacion-termica');
    let viento = document.getElementById('viento');
    let condicion_clima = document.getElementById('condicion-clima');
    let condicion_img = document.getElementById('condicion-img') as HTMLImageElement;

    ciudad.innerHTML = "Ciudad: " + this.results.name;
    temperatura.innerHTML = (this.results.main.temp).toFixed(0) + "º";
    humedad.innerHTML = "Humedad: " + this.results.main.humidity + "%";
    sensacion_termica.innerHTML = "Sensación Térmica: " + (this.results.main.feels_like).toFixed(0) + "ºC";
    viento.innerHTML = "Viento: " + this.results.wind.speed + " m/s";

    switch(this.results.weather[0].icon){
      case "01d":
        condicion_clima.innerHTML = "Cielo despejado";
        condicion_img.src = "/assets/img/sunny-vector.svg";
        break;
      case "01n":
        condicion_clima.innerHTML = "Cielo despejado";
        condicion_img.src = "/assets/img/sunny-vector.svg";
        break;
      case "02d":
        condicion_clima.innerHTML = "Pocas nubes";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
      case "02n":
        condicion_clima.innerHTML = "Pocas nubes";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
      case "03d":
        condicion_clima.innerHTML = "Nubes dispersas";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
      case "03n":
        condicion_clima.innerHTML = "Nubes dispersas";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
      case "04d":
        condicion_clima.innerHTML = "Nubes rotas";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
      case "04n":
        condicion_clima.innerHTML = "Nubes rotas";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
      case "09d":
        condicion_clima.innerHTML = "Lluvia ligera";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break;
      case "09n":
        condicion_clima.innerHTML = "Lluvia ligera";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break;
      case "10d":
        condicion_clima.innerHTML = "Lluvia";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break;
      case "10n":
        condicion_clima.innerHTML = "Lluvia";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break;
      case "11d":
        condicion_clima.innerHTML = "Tormenta";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break;
      case "11n":
        condicion_clima.innerHTML = "Tormenta";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break;
      case "13d":
        condicion_clima.innerHTML = "Nieve";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break; 
      case "13n":
        condicion_clima.innerHTML = "Nieve";
        condicion_img.src = "/assets/img/rain-vector.svg";
        break;
      case "50d":
        condicion_clima.innerHTML = "Niebla";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
      case "50n":
        condicion_clima.innerHTML = "Niebla";
        condicion_img.src = "/assets/img/cloudy-vector.svg";
        break;
  }
}

  async showLoading() {
    this.loadingElement = await this.loadingCtrl.create({
      message: 'Cargando Clima...',
      cssClass: 'custom-loading'
    });
    this.loadingElement.present();
  }
  

}
