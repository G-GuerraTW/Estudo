import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {

  public eventos: any = [
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
