### INSTALANDO Portainer Plugin
```
cd ~/
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer

http://localhost:9000
```
___
#### O Portainer é uma plataforma de gerenciamento de contêineres de código aberto que fornece uma interface intuitiva para gerenciar e implantar aplicativos em ambientes Docker. Ele simplifica as tarefas de gerenciamento, monitoramento e implantação de contêineres Docker, permitindo que os usuários gerenciem facilmente seus ambientes de contêineres em uma única interface.

#### Aqui estão algumas das principais funções e recursos do Portainer:

 #### Interface de usuário intuitiva: O Portainer possui uma interface de usuário fácil de usar, baseada na web, que permite que os usuários gerenciem facilmente contêineres, imagens, redes e volumes. Ele fornece uma experiência de gerenciamento simplificada, mesmo para usuários iniciantes em Docker.

#### Gerenciamento de contêineres: Com o Portainer, você pode criar, iniciar, parar, reiniciar e remover contêineres Docker com apenas alguns cliques. Ele oferece uma maneira conveniente de gerenciar a vida útil dos contêineres e visualizar seu status.

#### Implantação de aplicativos: O Portainer simplifica a implantação de aplicativos em contêineres Docker. Você pode criar e implantar pilhas de serviços usando arquivos Compose ou arquivos Stack. Isso permite que você defina a infraestrutura e os serviços necessários para executar seus aplicativos.

#### Gerenciamento de imagens: Com o Portainer, você pode procurar, baixar e gerenciar imagens Docker de repositórios públicos e privados. Ele também permite que você crie suas próprias imagens personalizadas a partir de arquivos Dockerfile.

#### Gerenciamento de usuários e equipes: O Portainer oferece recursos de gerenciamento de acesso e autenticação baseados em funções. Isso permite que você defina permissões e restrições para usuários individuais ou equipes, controlando o que eles podem fazer dentro do ambiente Docker.

#### Monitoramento e registros: O Portainer fornece ferramentas para monitorar o desempenho dos contêineres, visualizar estatísticas e analisar registros de contêineres em tempo real. Isso ajuda a identificar problemas, depurar aplicativos e otimizar o desempenho do ambiente de contêineres.

#### Essas são apenas algumas das principais funções do Portainer. Em resumo, ele oferece uma interface amigável e poderosa para gerenciar seus contêineres Docker, simplificando tarefas de implantação, gerenciamento e monitoramento.