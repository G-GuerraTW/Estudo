#### 1. Para Usar um Ip Estático no proxmox, navegue até o se guinte diertório, */etc/netwok* e edite o arquivo *interfaces*.

#### 2. O Arquivo devera ficar da seguinte forma, alterando os endereços de IP para o seu padrão.
```js
auto lo
iface lo inet loopback

iface enp0s3 inet manual

auto vmbr0
iface vmbr0 inet static
        address 192.168.30.99/24
        gateway 192.168.30.1
        bridge-ports enp0s3
        bridge-stp off
        bridge-fd 0
```

#### 3. logo após trocar o ip, verifique com o comando `ip a`, assim que verificado devera ser alterado a informação que encontra dentro do arquivo */etc/issue* adicionando o respectivo ip FIXO para o arquivo.