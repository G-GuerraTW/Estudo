### Acesse o Destino `usuario/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup` e dentro desta pasta crie um arquivo com qualquer nome `.bat` e adicione a seguinte linha dentro
```
"C:/Arquivos de Programas/Oracle/VirtualBox/VBoxManage.exe" startvm "Clone de Ubuntu Focal" --type headless
```

### Para saber quais VMS voce tem disponivel execute o seguinte comando, e copie o Nome dela.
```
"C:/Arquivos de Programas/Oracle/VirtualBox/VBoxManage.exe" list vms
```