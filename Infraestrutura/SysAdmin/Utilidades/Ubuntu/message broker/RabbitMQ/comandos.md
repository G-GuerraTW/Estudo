 ### Instalando o RabbitMQ 
 #### Siga o passo a passo descrito no site, de preferencia utilizar o Script [rabbitmq.com](https://www.rabbitmq.com/install-debian.html#apt-cloudsmith) utilizar repositorio Cloudsmith Quick start Script.
---
#### Comandos adicionais no qual é util após a instalação do Servidor.
#### - `sudo rabbitmq-diagnostics server_version` Verificar a versão do RabbitMQ 
#### - `systemctl status rabbitmq-server` Verifica o serviço do servidor na maquina
---
#### Comandos Para Ativar o Plugin Manager HTTP
#### - `sudo rabbitmq-plugins enable rabbitmq_management`
---
#### Comandos para adicionar um novo usuario e dar permissão.
#### - `sudo rabbitmqctl add_user "usuario" "senha"` tire as aspas
#### - `sudo rabbitmqctl set_user_tags "usuario" administrator`
#### -  `sudo rabbitmqctl set_permissions -p / "usuario" ".*" ".*" ".*"`
---
#### Logando a primeira vez no Portal WEB do RabbitMQ
#### Acesse http://localhost:15672/
#### - Utilizando esta maneira voce podera logar com o usuario `guest` e senha `guest`
#### - Caso acesse remotamente Troque o Localhost pelo ip Remoto no qual voce ira se conectar.
---
#### Ativando Ralocar o erro e tratar em uma fila
#### - `rabbitmq-plugins enable rabbitmq_shovel rabbitmq_shovel_management`