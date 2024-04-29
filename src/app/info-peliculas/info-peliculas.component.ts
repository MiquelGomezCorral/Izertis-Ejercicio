import { Component } from '@angular/core';
import { PeliculasService } from '../services/sercicio-peliculas.service';

@Component({
  selector: 'info_peliculas',
  standalone: true,
  imports: [],
  templateUrl: './info-peliculas.component.html',
  styleUrl: './info-peliculas.component.css'
})
export class InfoPeliculasComponent {
  /*=================================*/
  /*          VARIABLES              */
  /*=================================*/
  showBox: boolean = false;
  peliInfo: any = {};

  /*=================================*/
  /*          METODOS                */
  /*=================================*/
  constructor(private peliculasService: PeliculasService){ }

  showTab(id: string){
    // Mostrar más información sobre la película o un aviso para feedback
    this.peliculasService.getPelisPorId(id).subscribe({
      next: (result) =>{
        this.peliInfo = result;
        this.showBox = true;
      },
      error: (err) =>{
        alert("El API no proporciona más información sobre la película. Disculpe las molestias.")
        //console.log(err);
      }
    })
  }

  closeTab(){
    this.showBox = false;
  }

  openBrowser(url: string){
    // Abrir otra pestaña con el link de la película
    if (url == ''){
      alert("El API NO proporciona link para esta película. Disculpe las molestias.")
      return;
    }

    window.open(url, "_blank");
  }
}
