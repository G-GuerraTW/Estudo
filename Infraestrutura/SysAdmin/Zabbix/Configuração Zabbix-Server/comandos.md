### Após a instalação completa do zabbix-server é neecssario adicioanr as credenciais do banco de dados para acesso,

### para primeiro acesso:

- ### login: Admin
- ### senha: zabbix

### Após o login será necessario instalar o zabbix-agent no Host alvo para coleta de infomrações.

### Lembrando de criar o Grupo para o Host para ter organizado quando for adicionar o novo host.

### após va para aba data collection > Host > Create Host

### após clilar no create host siga adicionando essas informações

- ### Adicionar O Host name que foi configurado no zabbix-agent
- ### Adicionar Template
- ### Adicionar Host Groups < especifico>
- ### Interfaces selecionar Zabbix-Agent e adicionar o IP do host

- ### para monitorar os recuros vá em monitoring > hosts

- ### após conseguir monitorar os dados do host ja está pronto para prosseguir com a instalação do Grafana.


### Link para Tempaltes da comunidade >>>
* ### [Zabbix Comunity](https://github.com/zabbix/community-templates)
* ### [Zabbix-Search](https://monitoringartist.github.io/zabbix-searcher/)
* ### [Zabbix-OFC](https://www.zabbix.com/integrations)