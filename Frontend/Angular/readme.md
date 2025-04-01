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

#### apos criar os dois componentes iremos utilizar nossa primeira diretiva para poder percorrer um array de objetos: 
```HTML
    ng-fo
```