  // En este archivo se accede a un servicio externo
  // Documentación e información de este en el link
  /*====================================================== */
  /*                      API LINK                         */
  /* https://developer.themoviedb.org/docs/getting-started */
  /*====================================================== */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  /*=================================*/
  /*          VARIABLES              */
  /*=================================*/
  API_KEY = 'api_key=be6400e11f6da08777cf8235370492b9';
  BASE_URL = 'https://api.themoviedb.org/3';
  API_URL_PORDEFECTO = this.BASE_URL + `/trending/all/week?` + this.API_KEY;

  /*=================================*/
  /*          MÉTODOS                */
  /*=================================*/
  constructor(private httpClient: HttpClient) { }

  // ======== Devuelven la consulta a realizar ========
  getSearchPerKeywordsURL(keyWords: string): string {
    return this.BASE_URL + `/search/keyword?query=${keyWords}&page=1&` + this.API_KEY; 
  }
  getSearchPerIdURL(id: string): string {
    return this.BASE_URL + `/movie/${id}?` + this.API_KEY; 
  }
  /*
  getSearchFotoPerIdURL(id: string, extraPath: string): string {
    return this.BASE_URL + `/movie/${id}/${extraPath}?` + this.API_KEY; 
  }*/

  // ======== Devuelven la información requerida ========
  getPelisPorDefecto(): Observable<any>{
    return this.httpClient.get(   
      this.API_URL_PORDEFECTO                  
    ).pipe(res=>res);
  }
  getPelisPorKeywords(keyWords: string): Observable<any>{
    return this.httpClient.get(   
      this.getSearchPerKeywordsURL(keyWords)   
    ).pipe(res=>res);
  }
  getPelisPorId(id: string): Observable<any>{
    return this.httpClient.get(   
      this.getSearchPerIdURL(id)               
    ).pipe(res=>res);
  }
  /*
    getPelisFotoId(id: string, extraPath: string): Observable<any>{
    return this.httpClient.get(   this.getSearchFotoPerIdURL(id, extraPath)  ).pipe(res=>res);
  }*/
}
