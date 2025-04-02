## Iniciando uma aplicação Angular.

### para instalar o angular em seu sistema primeiro precisamos do Angular CLI para ele fazer o gerenciamento da Lib e do Desenvolvimento de sua aplicação angular.

* para instalar o angular **CLI** é necessario ter o node package manager.
```js
npm install -g @angular/cli
```

### Extensões Necessarias para um bom trabalho utilizando VSCode

* Angular Essentials
* Angular Files
* Auto Close Tag
* Auto Rename Tag
* Bracket Pair Colorizer 2
* Color HighLight
* Path Intellisense
* TSLint

---
### Inicializando o  projeto

#### Execute o comando para criar o projeto
```js
ng new ProEventos-App
```
#### Configure a aplicação com as seguintes opções
* Helps improve maintability ? YES
* would you like to add angular routing? YES
* SCSS 
---

#### Seguiremos adicionando componentes ao nosso projeto, inicialmente iremos adicionar um componente chamado **proeventos** e outro chamado **palestrantes**, para isto seguiremos com os comandos abaixo
```JS
ng g c proeventos
ng g c palestrantes
```

#### após gerar os componentes para teste iremos adicionar os componentes criados em nosso **app.component.html** deixando este arquivo desta maneira: 
```HTML
<app-eventos></app-eventos>
<app-palestrantes></app-palestrantes>
<router-outlet></router-outlet>
```

#### apartir destas tags estaremos importando dentro de nosso arquivo "Index" as infomrações contidas em outros componentes, incluido o que tiver dentro do compontente palestrante e o que estiver também dentro odo componente eventos.

### Exemplo de diretiva *ngFor dentro do componente eventos:

#### apos criar os dois componentes iremos utilizar nossa primeira diretiva para poder percorrer um array de objetos:, e inserimos desta maneira em nosso componente eventos,
 
```HTML
<div *ngFor="let evento of eventos">
    <p>Tema: {{evento.Tema}}</p>
    <p>Local: {{evento.Local}}</p>
    <hr>
</div>
```

#### Dentro de nosso arquivo **eventos.component.ts** iremos programar em Typescript criando um objeto evento, populando este objeto através de uma função para futuramente usarmos esta mesma estrutura para consumir o endpoint de uma api:
```TS

export class EventosComponent {

  public eventos: any = [];

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
}
```

#### Com está estrutura conseguimos percorrer o objeto utilizando a diretivar ***ngFor**

### Importando modulo **HTTP Client** dentro de nossa aplicação:
#### para podermos consumir API Rest em nossa aplicação necessitaremos do modulo **HttpClient**, importaremos no arquivo app.module.ts da seguinte forma: 
1 - Adicionando o import do modulo ao app.component:
```JS
import { HttpClientModule } from '@angular/common/http'
```
2 - Adicionando o modulo ao ngModule
```TS
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule       //   <--------
  ],
```
3 - Adicionaremos o http no construtor do componente no qual queremos trabalhar consumindo uma rota http, por exemplo no arquivoo eventos.component.ts, adicone a seguinte linha:
```TS
export class EventosComponent {
    public eventos: any = [];
    constructor(private http: HttpClient){} // <-----
}
```

4 - logo apos adicionar no construtor poderemos criar uma nova função para consumir os dados de uma api como o exemplo abaixo:
```TS
  public getEventosHttp(): void 
  {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }
```