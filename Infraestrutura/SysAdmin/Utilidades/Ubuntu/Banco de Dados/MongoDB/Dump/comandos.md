### Comando para Gerar Dump de uma database Especifica no Mongodb

```js
mongodump --db "NomeBanco"
 --authenticationDatabase "admin - Banco de Autenticação"
  --username "Admin - Usuario"
   --password 123456
    --out /home/inlive/backup/mongodb "Caminho de saida"
```

### Lembrando que o comando é todo em uma unica linha

### Comando para Restaurar a base de dados

```js
mongorestore --authenticationDatabase admin --username Admin --password 123456 --db "nome" --dir delivery_prd/
```

### Exemplo restaurando uma base de dados com arquivos locais para nuvem

```js
mongorestore --uri="mongodb+srv://delivery.6y2emmo.mongodb.net/delivery" --username ftechapp --password projetftech delivery/
```
