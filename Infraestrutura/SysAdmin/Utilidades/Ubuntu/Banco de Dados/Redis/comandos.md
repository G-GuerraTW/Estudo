## Instalando Aplicação

1. **`sudo apt-get update`**
2. **`sudo apt install redis` (Y)**

## Checkando a versão instala

**`redis-cli --version`**

## Startando o serviço do redis

**`sudo systemctl status redis`**
**`sudo systemctl start redis`**

## Bind adress do redis para não loopback,

**`sudo nano /etc/redis/redis.conf`**
**localize a linha que contem `bind 127.0.0.1 ::1` e altere para `0.0.0.0 ::1`**

## Alterando a senha padrão do Redis

**remover o # do arquivo /etc/redis/redis.conf `# requirepass foobared`**
