### First you need Run Proxmox And install an Debian CT, or run it on a device.

#### 1. After Run you System you need install the Curl to transfer the server data to you computer, run this line bellow 
#### 1. `apt upgrade`
#### 2. `apt install curl `
#### 3. Para o inicio da instalação do Pihole siga co mo comando. 
#### `curl -sSL https://install.pi-hole.net | bash`

#### 1. Selecione o Upstream DNs Provider como *(Cloudlare)*, proximo passo selecione as configurações recomendadas, e em Privacy utilize Show Everthing,


#### Lembrando que a Maquina na VM criada devera ter o IP Estatico, e esse ip sera o DNS utilizado para o FIltro de ADs.

### Pare Proseguir com unbound Siga esse passo, [GUIDE](https://docs.pi-hole.net/guides/dns/unbound/)
### Nao esqueca de utilizar o DNS Custom sendo no ipv4 `127.0.0.1#5335`

### Adicionando ip V6
* #### Para habilitar o IPV6 no Unbound.conf.d deve adicionar o YES nas 2 primeiras opcoes de ipv6
* #### Utilize o comando `ip a s` e copie seu ipv6 `fe80::6476:11ff:feae:1e24` e adicione ao final #5335