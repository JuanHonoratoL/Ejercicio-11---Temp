import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Alumno {
  id: number;
  matricula: string;
  nombre: string;
  carrera: string;
  semestre: number;
  status: 'Activo' | 'Baja temporal' | 'Egresado';
}

@Component({
  selector: 'app-listado-alumnos',
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-alumnos.html',
  styleUrl: './listado-alumnos.css',
})
export class ListadoAlumnos {
  mostrarTabla = true;
  menuAbierto = true;
  seccionActiva = 'Alumnos';

  nombreBusqueda = '';
  carreraSeleccionada = 'Todas';

  carreras: string[] = [
    'Todas',
    'Ingeniería en Sistemas Computacionales',
    'Ingeniería Mecatrónica',
    'Ingeniería Ambiental',
    'Ingeniería en Alimentos',
    'Ingeniería Metalúrgica',
  ];

  alumnos: Alumno[] = [
    {
      id: 1,
      matricula: '20260002598',
      nombre: 'Luis Enrique Lopez Beltran',
      carrera: 'Ingeniería en Sistemas Computacionales',
      semestre: 7,
      status: 'Activo',
    },
    {
      id: 2,
      matricula: '20240002598',
      nombre: 'María González Torres',
      carrera: 'Ingeniería Mecatrónica',
      semestre: 7,
      status: 'Activo',
    },
    {
      id: 3,
      matricula: '20240003598',
      nombre: 'Carlos Ramírez Díaz',
      carrera: 'Ingeniería en Sistemas Computacionales',
      semestre: 3,
      status: 'Baja temporal',
    },
    {
      id: 4,
      matricula: '20240004598',
      nombre: 'Ana Martínez Ruiz',
      carrera: 'Ingeniería Ambiental',
      semestre: 6,
      status: 'Activo',
    },
    {
      id: 5,
      matricula: '20240005598',
      nombre: 'Pedro Sánchez Flores',
      carrera: 'Ingeniería Mecatrónica',
      semestre: 9,
      status: 'Egresado',
    },
  ];

  get alumnosFiltrados(): Alumno[] {
    const termino = this.normalizarTexto(this.nombreBusqueda.trim());
    return this.alumnos.filter((alumno) => {
      const coincideNombre =
        !termino ||
        this.normalizarTexto(alumno.nombre).includes(termino) ||
        alumno.matricula.includes(termino);
      const coincideCarrera =
        this.carreraSeleccionada === 'Todas' || alumno.carrera === this.carreraSeleccionada;
      return coincideNombre && coincideCarrera;
    });
  }

  get totalAlumnos(): number {
    return this.alumnos.length;
  }

  get totalActivos(): number {
    return this.alumnos.filter((a) => a.status === 'Activo').length;
  }

  get totalEgresados(): number {
    return this.alumnos.filter((a) => a.status === 'Egresado').length;
  }

  alternarTabla(): void {
    this.mostrarTabla = !this.mostrarTabla;
  }

  alternarSidebar(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  seleccionarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  private normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
