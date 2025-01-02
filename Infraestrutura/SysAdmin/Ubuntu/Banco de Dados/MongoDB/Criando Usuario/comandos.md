#### 1. entre no MongoDB via terminal
#### `mongo --port 27017`
#### 2. utilize os seguintes comandos para adicionar um novo usuario no cargo ADM, utilize *user* como nome do usuario, *pwd* senha
```js
use admin
db.createUser(
{
    user: "Admin",
    pwd: "myNewPassword",
    roles: [
              { role: "userAdminAnyDatabase", db: "admin" },
              { role: "readWriteAnyDatabase", db: "admin" },
              { role: "dbAdminAnyDatabase", db: "admin" },
              { role: "clusterAdmin", db: "admin" }
           ]
})
```
#### 3. logo apos o comando inserido vc terá uma msg escrita com SUCESSO, próximo passo é Habilitar a autenticação no *mongod.conf*, se encontra no repositório /etc/mongod.conf, edite ele e altera a linha `#security`
```js
 security:
    authorization: enabled
```
#### 4. após salvar, execute os seguintes comandos; `systemctl daemon-reload`, `systemctl restart mongod`, e verefique o estado do serviço -> `systemctl status mongod`, caso o serviço ja estiver ativo rodando, Sucesso, sua autenticação está ativa.
---
#### 5. Autenticando Login
##### Lembrando que para authenticar o login antes devera selecionar a base de dados para autenticação, por exemplo `use admin` e logo em seguida o comando para autentica
#### `db.auth("UserName", "Pass")`
---
#### 6. Criando uma *Database*
```js
use nomedb
db.nomedb.insert({nome: "Ada Lovelace", idade: 205})
```
#### o resultado sendo 
```js
WriteResult({{"nInserted" : 1 })
```
#### Siguinifica que a inserção no banco foi correta