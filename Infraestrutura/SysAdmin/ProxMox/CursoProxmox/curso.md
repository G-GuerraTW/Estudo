## ProxMox

este curso ensina como utilizar o proxmox de forma completa, desde a configuração completa entre cluster e nodes, para virtualizações de Firewall, kernels, NAS etc..

---

#### abaixo estárei listando  os passo a passo para montar o ambiente no qual o curso está solicitando,

**Primeiramente** para iniciar a simulação do baremetal precisaremos de uma imagem do **opnsense**, **proxmox** 8.x e uma imagem do **debian**,

após ter as imagens iniciaremos com a configuração da máquina virtual do opnsense para servir como **Firewall** de nossas máquians virtuais.

### Configuração VirtualBox Máquina Opensense
---
1. Placa-mãe: 
    1. desabilitar Diskete
    2. Habilitar PAE/NX
    3. Habilitar VT-X Aninhado
2. Aceleração:
    1. Habilitar Paginação Aninhada
3. Display:
    1. Habilitar Aceleração 3D
4. Áudio
    1. Desabilitar Áudio.
5. Rede:
    1. Adaptador 1 
        1. Habilitar Placa de Rede
        2. Modo NAT
    2. Adaptador 2
        1. Habilitar Placa de Rede
        2. Placa em Modo Bridge
    3. Adaptador 3 
        1. Habilitar Placa de rede
        2. Placa em modo Rede Interna
        4. Nome do adaptador: VIRT
    4. Adaptador 4
        1. Habilitar Placa de rede
        2. Placa em modo Rede Interna
        3. Nome do adaptador: CORE
        4. Promiscous Mode: Allow All

### Primeira Inicialização e  configuração do Opensense

1. Configuração das interfaces de rede 
    1. após ser incializado pela primeira vez o terminal ira informar se deseja configurar as interfaces de rede do sistema, e voce aperta uma tecla para inicializar a configuração.

    2. quando perguntado se ira configurar o LAGG nao configure no momento.

    3. Perguntando se ira configurar Vlans e no momento não iremos configurar também

    4. Agora ele está perguntando qual interface é a WAN  e configuramos em0 como WAN

    5. Agora perguntou qual é a LAN e configuramos em1 como Bridge para enchergar nosso computador, ou seja ela sera a LAN

    6. após prosseguir ele ira perguntar se deseja adicionar uma outra interface opcional, e por momento não iremos então apenas de enter sem escrever nada e logo abaixo ele ira exibir as interfaces que serão assinadas com a nossa configuração.

    7. após realizar o assignement entre as interfaces é a hora de instalar o sistema, e para isso iremos utilizar o login como **installer** para inicar o instalação e a senha opnsense.

    8. agora iremos configurar o teclado e selecionar o brasil com acentos,

    9. Iniciaremos o Install (UFS) para as partições do disco | aqui não tem segredo é apenas ler e continuar

    10. Adicionando a senha de root ! | logo após apenas selecionar complete install e dar o reboot.

    11. Desabilitar o DHCP e adicionar um IP FIXO
    **PARA O CURSO APENAS** |
    faça o Login, e selecione a opção 8 para entrar no **shell**,  e logo após digite o comando para editar a configuração: 
    **vi /conf/config.xml** dentro do vim utilize do comando **:/dhcpd** para procurar para a linha que tem a configuração do DHCP apague a linha enable com dd no vim.

    12. apos feito retorne para o metnu de opções apertando ctrl + d

---