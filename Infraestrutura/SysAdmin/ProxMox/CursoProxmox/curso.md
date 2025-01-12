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

### 8. Agora iremos exportar o Cliente do OPen VPN
  1. Acesse o caminho: VPN/OPENVPN/Client Export e deixe a configuração como na imagem a baixo.
    ![Imagem](/imagens/OpenVPN%20Client%20Export.png) e logo após preencher os dados selecione o Linked user para baixar o certificado e utilizar no cliente.

---

## Instalando PVE1 

### 1. Agora iremos configurar a VM PV1 que portara a configuração do Cluster Proxmox, sua configuração deve ficar como listado na imagem abaixo:
![Imagem](/imagens/virtualBoxPVE1.png) e após a configuração deste pv1 devemos clonar a maquina antes de iniciar a instalação para uma nova maquina chamada **pveBase** pois quando tivermos a necessidade de criar novos PVE clonamos deste pveBase que ja está pronto para uso.

### 2. Instalando PVE no primeiro Node
  1. Apos iniciar o pv1 com a imagem do proxmox selecione a opção graphical para instalação no node.
  2. Inicie a instalação selecionando o disco maior de 35 gigas para o sistema do proxmox, 
      1. está maquina tera o endereço: IP 192.168.110.101/24 | Gateway 192.168.110.10 | DNS: 192.168.110.10  e  Hostname: PVE2.Curso.DC
      2. após a atribuição dos endereços IP continue para instalação de PVE e posteriormente ele ira rebootar
      3. após o reboot ter acontecido e a instalação concluida do PVE agora voce conecte no endereço dele utilizando o navegado.
  3. Ajustando repositórios do node para atualização é necessario realizar todos os novos no para alinhar as versões de softwares e bibliotecas
    1.  Selecione o PVE aqual e navegue para o caminho Updates/Repositories e nesta janela clique em ADD repositories, após selecionar o botão add vai aparecer uma janela falando que não tem subscription, de OK e após isso no dropdown selecione a opção No-Subscription e clique em ADD novamente.
    2.  Desabilite o Repositories Enterprise na lista,
    3. Navegue até /Updates e selecione a opção Refresh
    4. proximo passo é selecionar na parte superior UPGRADE, prossiga com Y para atualização, e neste momento não podera ser fechada a janela do console, caso fechar sera pausada a atualização do kernel da PVE.
    5. Reboot no node via web.

---

  ## opções de Rede, 
  segue abaixo uma imagem mostrando as nomenclaturas para cada tipo de interface de rede que podemos utilizar no nosso PVE
  ![Imagem](/imagens/nomenclaturaRedes.png)

1. Criando uma placa Bridge para utilizar na VM dentro do proxmox
    1. Acesse o o PVE via web e va para o caminho System/Network e crie uma nova interface de rede sendo uma Linux Bridge, defina o endereço de IP como por exemplo: 192.168.1.51/24 e no campo gateway deixe em branco para utilizar da bridge que ja está existe como placa fisica no PVE, em seguida clique em apply e confirme para criar está nova interface de rede.
    2. apos realizar a configuração certifique de abrir o shell e pingar a rede, por exemplo 192.168.1.1

---

### Áreas de armazenamento

sera listado abaixo os tipos de armazenamentos que o PVE gerencia,

1. Existe dois tipos de storages de armazenamento no PROXMOX, a de nivel de arquivo e as de níveis de blocos,
  1. Níveis de arquivos (Files level storage) | armazena qualquer tipo de arquivo inclusive discos virtuais
  2. Block levle Storage | são armazenamentos proprio para guardar volumes de dados em formato raw, ou seja pode se armazenar diversos discos em um Block level storage
  ![Imagem](/imagens/storagePVE.png)
  3. Destaques de formatos para utilizarmos, DIR, VFS, Ceph/RBD, LVM Thin, ZFS
  4. para verificar os formatos acesse datacenter/storage clique em add

2. Formato DIR ou Directory é o mais simples de usar, so tendo um disco disponivel no node ja pode configurar ele na interface para ser um diretorio vamos seguir o passo a passo para monntar um disco do tipo DIR
  1. Selecione o Nó aonde iremos criar o acesso para o Directory (PVE1)
  2. selecione Disks/Directory clique em create: Directory
  3. selecione o disco, exemplo /dev/sdb. após selecionar o disco selecione o formato EXT4 e de um nome para ele "DIR" e selecione add storage
  4. Remover apos o teste, selecione o Datacenter, selecione Disk selecione o Disco DIR e apague ele, lembrando que para reutilizalo mesmo após apagado é necessario limpar ele

3. CEPH e ZFS os melhores para formato de bloco

### LVM

  1. LVM é uma camada de software que utilizamos discos e partições, podemos criar volumes de dados, e reparcitionando as lvms da maneira que queremos, a LVM combinamos discos de outros clusters também e ele trabalha operando como um sharedstore, ja LVM Team pode apenas fazer o compartilhamento local dos dados.
    1. Criando um Storage LVM Team para teste,
      1. Selecione o node PVE1/Disks/Directory para remover o disco Directory anteriormente criado, clique nos 3 pontos no canto direito e clique em destroy
      2. volte para o caminho PVE1/Disks/
      3. selecione os dicos /dev/sdb, sdc, sdd e clique em Wipe Disk
      4. em Disk selecione /dev/sdb va para a aba LVM-Thin e clique em Create Thinpool com o nome "pv1LvmThin"
---

### Crie um segundo Nó com o nome PVE2