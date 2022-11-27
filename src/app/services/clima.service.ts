import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  constructor(private http: HttpClient) { }

getClimaData(): Observable<any> {
    return this.http.get(`${environment.apiClima}lat=44.34&lon=10.99&appid=${environment.apiKeyClima}&units=metric`);
  }

}
