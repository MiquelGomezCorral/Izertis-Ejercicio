import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoPeliculasComponent } from '../info-peliculas/info-peliculas.component';
import { PeliculasService } from '../services/sercicio-peliculas.service';
import { PeliculaInterface } from '../interfaces/pelicula.interface';

@Component({
  selector: 'tabla_peliculas',
  standalone: true,
  imports: [InfoPeliculasComponent],
  templateUrl: './tabla-peliculas.component.html',
  styleUrl: './tabla-peliculas.component.css'
})
export class TablaPeliculasComponent implements OnInit{

  /*=================================*/
  /*          VARIABLES              */
  /*=================================*/
  // Lista de películas búscadas. Ejemplos de prueba
  peliculasList: PeliculaInterface[] = [
    {id:"1", title:'paco',   name:"Paco"},
    {id:"2", title:'RAMOON', name:"Ramoon"},
  ];

  //Variable que controla el cuadro de entrada
  textInputValue: string = ''; 
  //Variable que controla los terminos por lo que se buscan
  TerminoBusqueda: string = 'Más visto de la semana'; 

  // Variable del componente hijo. Para llamar sus funciones
  @ViewChild(InfoPeliculasComponent) infoPeliculas!: InfoPeliculasComponent;
  
  /*=================================*/
  /*          METODOS                */
  /*=================================*/
  constructor(private peliculasService: PeliculasService){ }
  
  ngOnInit(): void { 
    this.getPelisPorDefecto() 
  }

   
  disableOrEnableButton() {
    // Descativar el botón si NO hay texto
    this.textInputValue = (document.getElementById('textInput') as HTMLInputElement).value.trim();
  }

  searchPelis(){
    //Búsqueda por defecto
    if (this.textInputValue == ''){
      this.getPelisPorDefecto()
      this.TerminoBusqueda = 'Más visto de la semana';
      return;
    }

    //Búsqueda por tokens
    this.peliculasService.getPelisPorKeywords(this.textInputValue).subscribe({
      next: (result) =>{
        this.peliculasList = result.results;
        this.TerminoBusqueda = this.textInputValue;
      },
      error: (err) =>{console.log(err);}
    })
  }


  
  getPelisPorDefecto(){
    // Usar el service para hacer una búsqueda por defectos
    this.peliculasService.getPelisPorDefecto().subscribe({
      next: (result) =>{
        this.peliculasList = result.results;
      },
      error: (err) =>{console.log(err);}
    })
  }

  showInfoPeli(id: string){
    // Muestra la pestaña para dar información sobre la película. Activa funciones del hijo
    if (id == '') 
      return;

    if (this.infoPeliculas) 
      this.infoPeliculas.showTab(id);
  }
}

