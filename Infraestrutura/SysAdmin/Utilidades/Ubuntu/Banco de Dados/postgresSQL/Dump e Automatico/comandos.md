### Para executar um Dump de uma unica base de dados execute o comandos abaixo
#### 1 - `su postgres`
#### 2 - `pg_dump dbname > dbname.bak`
#### O Dump sera armazenado no seguinte repositório `/var/lib/postgresql`
#### Para Realizar um dump completo de todas as bases de dados presente utilize o seguinte comando `pg_dumpall > pg_backup.bak` no qual se encontrara no mesmo repositório 

### Restaurando pg_dumpall
* #### Execute o comando para executar uma restauração total de banco `psql -f [db_backup.sql]`

#### Lembrando que para Redirecionar o BACKUP o usuario postgres devera ter a permissão do local do diretório, assim como
### `sudo chmod a+rwx /diretorio/backup`