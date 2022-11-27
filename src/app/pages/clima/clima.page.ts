import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  constructor(private climaService: ClimaService) { }

  results = null;

  ngOnInit() {
    this.climaService.getClimaData().subscribe((res) => {
      this.results = res;
     });
  }

  funcionClima(){
    let ciudad = document.getElementById('ciudad');
    let temperatura = document.getElementById('temperatura');
    let humedad = document.getElementById('humedad');
    let presion = document.getElementById('presion');
    let viento = document.getElementById('viento');

    ciudad.innerHTML = "Ciudad: " + this.results.name;
    temperatura.innerHTML = "Temperatura: " + this.results.main.temp + "°C";
    humedad.innerHTML = "Humedad: " + this.results.main.humidity + "%";
    presion.innerHTML = "Presión: " + this.results.main.pressure + " hPa";
    viento.innerHTML = "Viento: " + this.results.wind.speed + " m/s";
  }



}
