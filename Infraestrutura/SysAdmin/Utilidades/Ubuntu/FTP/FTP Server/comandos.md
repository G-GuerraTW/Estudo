##   Comandos Para Criar um servidor FTP utilizando VSFTPD

* #### Instalando VSFTPD
1. **sudo apt update**
2. **sudo apt upgrade**
3. **sudo apt install vsftpd**
3. **sudo service vsftpd status (verifica Status do servidor FTP)**

* #### Configurando Firewall
1. **sudo ufw allow 20/tcp**
2. **sudo ufw allow 21/tcp**
3. **sudo ufw allow 40000:50000/tcp**
3. **sudo ufw allow 990/tcp**
4. **sudo ufw enable (y)**  
5. **sudo ufw enable OpenSSH**  
6. **sudo ufw enable**  
7. **sudo ufw status (verifique se todas regras foram adicionadas corretamente)**  

* #### Criando usuario FTP
**Para deletar um usuario userdel 'USERNAME'**
1. **sudo adduser 'nomeUsuario' (Gere uma senha)**
2. **Crie uma pasta para adicionar ao FTP**
3. **Set o dono do diretório para ninguem 'sudo chown nobody:nogroup /home/'Endereço do diretório'**
4. **Set a permissão do FTP utilizando chmod 'sudo chmod a-w /home/'Endereço do diretório'**
5. **Set o usuario dono da pasta sudo chown nomeusuario:nomeusuario /home/endereco do diretorio**

* #### VSFTPD Configurando Server
1. **sudo mv /etc/vsftpd.conf /etc/vsftpd.conf.origin**
2. **sudo vi /etc/vsftpd.conf**
3. **Adicione as linhas abaixo no arquivo**
**listen=NO**
**listen_ipv6=YES**
**anonymous_enable=NO**
**local_enable=YES**
**write_enable=YES**
**local_umask=022**
**dirmessage_enable=YES**
**use_localtime=YES**
**xferlog_enable=YES**
**connect_from_port_20=YES**
**chroot_local_user=YES**
**secure_chroot_dir=/var/run/vsftpd/empty**
**pam_service_name=vsftpd**
**force_dot_files=YES**
**anon_upload_enable=YES**
**anon_mkdir_write_enable=YES**
**file_open_mode=0777**
**pasv_min_port=40000**
**pasv_max_port=50000**
`user_sub_token=$USER`

    `local_root=/home/$USER/ftp`

* #### Restartando Serviço
1. **sudo systemctl restart vsftpd.service**

### Seu ambiente está pronto para uso FTP.