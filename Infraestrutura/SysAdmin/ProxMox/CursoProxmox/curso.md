# ProxMox

Este curso ensina como utilizar o Proxmox de forma completa, desde a configuração de cluster e nodes, até virtualizações de Firewall, kernels, NAS, etc.

---

## Passo a Passo para Montar o Ambiente

**Primeiramente**, para iniciar a simulação do baremetal, precisaremos das seguintes imagens:

- **OpnSense**
- **Proxmox 8.x**
- **Debian**

Após ter as imagens, iniciaremos com a configuração da máquina virtual do **OpnSense** para servir como **Firewall** das nossas máquinas virtuais.

---

## Configuração VirtualBox - Máquina OpenSense

### 1. Placa-mãe
- Desabilitar Diskette
- Habilitar PAE/NX
- Habilitar VT-X Aninhado

### 2. Aceleração
- Habilitar Paginação Aninhada

### 3. Display
- Habilitar Aceleração 3D

### 4. Áudio
- Desabilitar Áudio

### 5. Rede
- **Adaptador 1**:
  - Habilitar Placa de Rede
  - Modo NAT
- **Adaptador 2**:
  - Habilitar Placa de Rede
  - Modo Bridge
- **Adaptador 3**:
  - Habilitar Placa de Rede
  - Modo Rede Interna
  - Nome: `VIRT`
- **Adaptador 4**:
  - Habilitar Placa de Rede
  - Modo Rede Interna
  - Nome: `CORE`
  - Promiscuous Mode: `Allow All`

---

## Primeira Inicialização e Configuração do OpenSense

### 1. Configuração das Interfaces de Rede
- Ao iniciar pela primeira vez, o terminal irá perguntar se deseja configurar as interfaces de rede. Aperte uma tecla para iniciar a configuração.
- Não configure o LAGG neste momento.
- Não configure VLANs neste momento.
- Defina **em0** como a interface **WAN** e **em1** como a interface **LAN**.
- Após o "assignement", pressione Enter para continuar.

### 2. Instalação do Sistema
- Faça login como `installer` com a senha `opnsense`.
- Selecione o layout do teclado como Brasil (com acentos).
- Instale o sistema utilizando o disco com partições **UFS**.
- Defina a senha de root e conclua a instalação. Após isso, reinicie a máquina.

### 3. Configuração de IP Fixo
- Desabilite o DHCP e configure um IP fixo.
- Acesse o shell no menu de opções e edite a configuração com o comando:  
  `vi /conf/config.xml`
  - No **vim**, procure pela linha `dhcpd` e apague a linha que habilita o DHCP (`dd` no vim).
- Após isso, retorne ao menu de opções (Ctrl + D) e configure o IP da **LAN** (Ex: `192.168.1.50/24`).

### 4. Acesse o Firewall via Navegador
- Após configurar o IP, acesse o **OpenSense** via navegador usando o endereço IP configurado.

---

## Configuração do OpenSense via Web

### 1. Login no OpenSense
- Login como `root` utilizando a senha configurada.

### 2. Configuração de Sistema
- Vá para `System > Settings > General` e configure as opções abaixo:
  - **Hostname**: `firewall`
  - **Domain**: `curso.dc`
  - **Time Zone**: `America/Sao_Paulo`
  - **Language**: `English`
  - **Theme**: `opnsense`

### 3. Atualizações do Firewall
- Vá em `System > Firmware > Status` e clique em `Check for updates`.
- Aceite as atualizações e aguarde.
- Se não reiniciar automaticamente, reinicie manualmente.

---

## Configuração das Interfaces do Firewall

### 1. Acessar Interface de Configuração
- Acesse `Interfaces > Assignments` para configurar as interfaces.
- Adicione VLANs:
  - **VLAN 120**: `Description: CLUSTER2`, `Parent: em3`
  - **VLAN 130**: `Description: INTRANET`, `Parent: em2`
  - **VLAN 140**: `Description: EXTRANET`, `Parent: em3`

### 2. Configuração das Interfaces
- Configure as interfaces:
  - **Cluster 1**: `IP: 192.168.110.10/24`
  - **Cluster 2**: `IP: 192.168.120.10/24`
  - **EXTRANET**: `IP: 192.168.140.10/24`
  - **INTRANET**: `IP: 192.168.130.10/24`

---

## Regras de Firewall

### 1. Regras de Acesso ao PVE
- Adicione uma nova regra para permitir o acesso ao PVE entre os clusters.
- Clone a regra para permitir ICMP e para as interfaces **CLUSTER2**, **EXTRANET** e **INTRANET**.

---

## Configuração da VPN (Cliente to Site)

### 1. Criar Entidade Certificadora
- Acesse `System > Trust > Authorities` e adicione uma nova entidade certificadora.
- Configure conforme a imagem:
  ![Imagem](/imagens/entidadeCertificadora.png)

### 2. Criar Certificado para o Firewall
- Acesse `System > Trust > Certificates` e adicione um novo certificado:
  - **Description**: `FirewallVPN_CERT`
  - **Type**: `Server Certificate`
  - **Issuer**: `FirewallVPN_CA`
  - **Common Name**: `Firewall.curso.dc`
  - **IP Address**: `192.168.1.50`

### 3. Criar Certificado para Usuário
- Acesse `System > Access > Users` e edite o usuário.
- Adicione um novo **User Certificate**:
  - **Method**: `Create an internal certificate`
  - **Issuer**: `FirewallVPN_CA`

### 4. Gerar Chaves Criptográficas
- Acesse `VPN > OpenVPN > Instances` e gere as chaves.
- Crie uma chave com o nome `VPN_CURSO_ST` em modo **Crypt** e salve.

### 5. Criar a Instância do OpenVPN
- Acesse `VPN > OpenVPN > Instances` e adicione uma nova instância.
- Configure conforme as imagens:
  ![Imagem](/imagens/instanciaOpenVPN1.png)
  ![Imagem](/imagens/instanciaOpenVPN2.png)
  ![Imagem](/imagens/instanciaOpenVPN3.png)

### 6. Verificar Status da VPN
- Acesse `VPN > Connection Status` e verifique se a instância do servidor VPN está OK.

### 7. Regras de Acesso pela VPN
- Acesse `Firewall > Rules > OpenVPN` e adicione uma nova regra:
  - **Description**: `Liberação para TI`

---

Pronto! Esse conteúdo foi organizado e estruturado de forma clara para facilitar sua consulta no futuro. Caso precise de ajustes adicionais, posso ajudá-lo com isso.
