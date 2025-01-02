### Primeiramente antes de instalar o Zabbix-server sera necessario a instalação do Sql Server para a coleta de dados.

### Siga a documentação original para instalação [clique aqui](https://www.zabbix.com/download?zabbix=6.4&os_distribution=ubuntu&os_version=20.04&components=server_frontend_agent&db=mysql&ws=apache)

### Após instalação alterar as infomrações no arquivo /etc/zabbix/zabbix_agentd.conf

- ### Em Server e Server activice adicione o endeço IP do servidor

### Lembrando que o melhor caminho é utilizando o apache como webserver.
