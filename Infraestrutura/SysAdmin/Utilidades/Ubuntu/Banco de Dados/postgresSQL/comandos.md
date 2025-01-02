## Instalando PosgreSQL
### 1.  Primeiro Atualize a sua Dist ` sudo apt update`
### 2. Segundo passo `sudo apt install postgresql postgresql-contrib`
### 3. Inicie o Serviço `sudo systemctl start postgresql.service`
---

## PostgreSQL Usuario e Auth, primeiramente Logue no PostgreSQL Terminal
`sudo -u postgres psql`
### 1. Crie o super usuario com os comandos abaixo, e escolha o nome no lugar de *username*
```js
CREATE USER username WITH SUPERUSER PASSWORD 'passwordstring';
```
---
### 3. Criando a primeira Base de dados
```js
CREATE DATABASE mydatabase;
```
---
## Binding O endereço Local para acesso Remoto
### 1. Acesse o Arquivo `/etc/postgresql/12/main/postgresql.conf`
#### Altere a seguinte linha `listen_addresses = '0.0.0.0'            # what IP address(es) to listen on;`
### 2. Acesse o Arquivo `/etc/postgresql/12/main/pg_hba.conf`
#### Abaixo da seguinte linha `# TYPE  DATABASE USER ADDRESS METHOD`
#### adicione a seguinte linha `host  all  all 0.0.0.0/0 md5`