### Caso Já Estiver Instalado, Desinstale
#### `sudo service mongod stop `
#### `sudo apt purge mongo*`
---

#### 1. `wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -`
#### 2. `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list`
#### 3. `sudo apt-get update`
#### 4. `sudo apt-get install -y mongodb-org=4.4.11 mongodb-org-server=4.4.11 mongodb-org-shell=4.4.11 mongodb-org-mongos=4.4.11 mongodb-org-tools=4.4.11`
#### 5. `sudo systemctl start mongod`
#### 6. `sudo systemctl status mongod`
#### 7. Não esqueça de dar Bind no ip para 0.0.0.0 no arquivo */etc/mongod.conf* na linha `bindIp: 0.0.0.0`
