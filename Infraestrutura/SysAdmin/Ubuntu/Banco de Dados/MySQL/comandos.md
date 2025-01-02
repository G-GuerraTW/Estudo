### 1. Instalando o Mysql
1. #### Primeiramente Instale o MYSQL `sudo apt install mysql-server -y`
2. #### Após a instlação check se está instalado verificando a versão `mysql -V`
---
### 2. Adicionando um Usuario
1. #### entre no Mysql-Terminal com o comando`mysql -u root -p`
2. #### após conectar no mysql use os comandos abaixos, torcando usuario para o seu nome de usuario.
```js
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'sua senha';
GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'localhost'
    ->     WITH GRANT OPTION;

CREATE USER 'usuario'@'%' IDENTIFIED BY 'sua senha';
GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'%'
    ->     WITH GRANT OPTION;
```
---
3. ### Criando a primeira Base de dados Via Terminal.
1. #### `CREATE DATABASE db_name;`