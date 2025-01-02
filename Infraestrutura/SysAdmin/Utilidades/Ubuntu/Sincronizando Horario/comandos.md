## Passos para sincronizar Time Zone no Ubuntu server
---
#### 1 -  Verifique a Lista de Timezone
```JS
timedatectl list-timezones
```

#### 2 -  Set O time zone escolhido
```JS
sudo timedatectl set-timezone America/Sao_Paulo
```

#### 3 -  Edite o seguinte arquivo 
```JS
nano /etc/systemd/timesyncd.conf

[Time]
NTP=pool.ntp.br
FallbackNTP=b.ntp.br c.ntp.br
```

#### 4 -  Execute os seguintes comandos
```JS
sudo timedatectl set-ntp off
sudo timedatectl set-ntp on
sudo systemctl daemon-reload
```

#### 5 -  Verifique se a opção Sync está ativa
```JS
sudo datetimectl status
```