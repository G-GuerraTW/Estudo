import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {

  public eventos: any = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.eventos = [
      {
         Tema: "Angular",
         Local: "Belo Horizonte"
      },
      {
         Tema: "Dotnet",
         Local: "São Paulo"
      },
    ]
  }

  public getEventosHttp(): void 
  {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }
}