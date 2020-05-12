import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RESTserviceService {

  constructor(private httpCLient: HttpClient) { }

  //funcion asincrona para obtener el json de una pelicula segun su id (REST ejemplo de peliculas)
  async getPelicula(id: string) {

    let result;

    const url: string = `https://www.etnassoft.com/api/v1/get/?id=${id}`

    const httpHeader: HttpHeaders = new HttpHeaders();

    httpHeader.append("Content-Type", "application/json");

    //hacemos un toPromise para convertirlo en una promesa y poder hacer un await
    await this.httpCLient.get(url).toPromise().then((data) => {
      
      result = data;
      
    });

    return result;

  }



}
