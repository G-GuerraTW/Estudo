### Siga a documentação para instalação do Grafana [Clique Aqui](https://grafana.com/grafana/download/10.2.3?edition=oss&pg=get&platform=linux&plcmt=selfmanaged-box1-cta1) Selecione a versão OSS que é free para uso

### não esqueça de rodar os comandos que são indicados no final da instalação do grafana !

- ### após instalação do Grafana e conexão pela porta 3000 entre no Grafana > Administration > Plugins

- ### Procure por Zabbix E clique em instalar após instalar voce precisa habilitar o plugin do Zabbix, Clique em Plugins and data > plugins > zabbix e aperte F5, após clique em Enable.

### próximo passa é adicionar o datasource do zabbix

- ### va em conecctions > Data sources
- ### add data sources > Zabbix
- ### no campo Connection url digite a url sugestiva, mais é só colocar o IP do servidor que está com o grafana instalado
- ### proxima etapa é adicionar as credenciais no Zabbix connection, usuari oe senha. após isso ja está pronto para gerar seu primeiro dashboard !
