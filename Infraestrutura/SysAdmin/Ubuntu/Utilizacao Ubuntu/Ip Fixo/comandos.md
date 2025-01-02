#### 1. Entre no destino `/etc/netplan/` de um `ls` e edite o arquivo no qual existir dentro deste repositorio, geralmente com o nome de _00-installer-config.yaml_ ou _config.yaml_

#### 2. Digite o comando `ip a` e anote o nome da interface exemplos de nome `enp0s3`

#### 3. adicione essas informações dentro do arquivo editado adicionando sua respectiva informação em cada bloco.

```js
network:
  ethernets:
    ens32:
      addresses:
        - 192.168.1.173/24
      gateway4: 192.168.1.172
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
      dhcp4: no
  version: 2

```

#### 3. apos salvar rode o comando `netplan try` e aguarde para o sistema validar a nova configuração, após a confirmação da validação utilize o comando `sudo netplan apply`. caso houver algum erro de syntax consultar [NetPlan](https://netplan.io/examples)
