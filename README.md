# Centavos Search -  buscador de centavos 

Para melhorar a interface de visualização dos seus centavos na disciplina de LOAC (Laboratório de Organização e Arquitetura de Computadores), criei o **Centavos Search**. Por meio dessa aplicação você poderá conferir suas ativiades corrigidas, a quantidade de centavos atribuída a cada uma das atividades e a quantidade de centavos acumulados até então na disciplina, buscando apenas por seu **ID DE ANONIMIZAÇÃO**, enviado por e-mail pelo professor.

<img align="center" src="https://images.vexels.com/media/users/3/145757/isolated/lists/73090e43d4f8b3a6f9b3f05852adfed4-lupa-de-dinheiro.png"/>

A aplicação pode ser acessada via **[https://centavos-search.firebaseapp.com/](https://centavos-search.firebaseapp.com/)**

##Como funciona o Centavos Search?

O **Centavos Search** é uma aplicação web composta de um back-end e um front-end.

O **back-end** é feito em Python3 e utiliza a biblioteca [Flask](https://flask.palletsprojects.com/en/2.0.x/) para sua construção. De modo geral ele opera lendo o arquivo [anon.txt ](http://lad.ufcg.edu.br/loac/uploads/OAC/anon.txt), que o professor realiza o upload no site da disciplina. O arquivo é lido e as principais informações são agrupadas no formato JSON e podem ser acessados por meio de uma API.

O **front-end** foi feito utilizando o framework [Gatsby](gatsbyjs.com/) e consome da API construída no back-end, organizando os dados minerados em cards com melhor visualização. 

## Quero contribuir, como rodar o projeto?

Primeiramente você precisa fazer um fork desse repositório e cloná-lo em sua máquina!

### Back-end 
Para rodar o back-end  basta ir para a pasta backend 
```bash
cd backend
```
Criar um ambiente virtual (você pode usar o venv para isso) e ativá-lo
```bash
python3 -m venv enviroment
```
```bash
source enviroment/bin/activate
```
Instalar as dependências utilizando o pip
```bash
pip install -r requirements.txt
```
ou
```bash
pip3 install -r requirements.txt
```
Rodar o app.py utilizando o próprio Python3 ou o Flask
```bash
python3 app.py
```
ou
```bash
flask run
```

##Front-end
Para rodar o front-end vá até a pasta correspondente
```bash
cd frontend
```
Instale as dependências 
```bash
npm install
```
Rode o projeto
```bash
npm run develop
```
O front-end estará rodando em localhost:8000
