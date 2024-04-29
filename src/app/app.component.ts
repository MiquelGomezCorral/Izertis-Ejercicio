import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablaPeliculasComponent } from './tabla-peliculas/tabla-peliculas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TablaPeliculasComponent, TablaPeliculasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Izertis-Ejercicio';
}
