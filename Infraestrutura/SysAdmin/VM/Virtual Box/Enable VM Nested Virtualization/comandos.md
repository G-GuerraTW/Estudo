### 1. Liste suas VMS utilizando o comando abaixo via CMD
#### `"C:\Program Files\Oracle\VirtualBox\VBoxManager.exe" list vms`
### 2. Após Conseguir o ID da VM Utilize o seguinte comando
#### `"C:\Program Files\Oracle\VirtualBox\VBoxManager.exe" modifyvm "nome vm" --nested-hw-virt on`
#### Teste a virtualização ninhada, caso mesmo assim houver erros de virtualização ninhada, siga com o seguinte comando via CMD.
#### `bcdedit /set hypervisorlaunchtype off` e reinicie o computador.
---
#### Uma outra opcao caso mesmo assim nao consiga iniciar uma virtualizacão aninhada, faca o seguinte,
#### 1. `Windows + R` e digite `gpedit.msc`, 
#### 2. Selecione este caminho `Configuracao do computador/Modelos Administrativos/Sistema/Device Guard`
#### 3. de 2 cliques no Device Guardo, e logo apos expandir a janela Desative a seguinte opcao => ***Ativar seguranca baseda em Virtualizacao***

### Reinicie o computador.

## Atenção, não equecer de ativar o Módo Promiscuo Na rede avançada do VirtualBox !

