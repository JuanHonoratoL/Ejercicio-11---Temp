import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoAlumnos } from './listado-alumnos/listado-alumnos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListadoAlumnos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ejercicio-11');
}
