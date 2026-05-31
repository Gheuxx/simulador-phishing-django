# Módulo: config

## Visão Geral
O módulo `config` é o diretório raiz do projeto Django. Ele orquestra toda a aplicação, gerenciando configurações fundamentais, como conexão com o banco de dados, configurações de segurança, aplicativos instalados (apps) e as rotas principais.

## Lógica Interna
Funciona como o "cérebro" das configurações da aplicação. O arquivo de configurações (settings) especifica como o Django deve operar, apontando para o banco de dados (SQLite3), definindo os templates e ativando middlewares de segurança, autenticação e sessão. O arquivo de rotas (urls) recebe todas as requisições iniciais e as delega para os módulos correspondentes.

## Componentes Principais
- **settings.py**: Arquivo com configurações do sistema (secret key, debug mode, apps registrados como `core`, `accounts`, `treinamento`, `relatorios`, caminhos de templates e arquivos estáticos).
- **urls.py**: Arquivo de roteamento principal que direciona URLs globais (`/admin/`, `/`, etc.) para as URLs dos submódulos.
- **asgi.py e wsgi.py**: Arquivos essenciais para a integração do projeto com servidores web em ambientes de produção.

## Sinergias e Dependências
Depende de todos os outros módulos da aplicação para que eles possam ser ativados (`INSTALLED_APPS`). Também integra todas as rotas (arquivos `urls.py` de cada app) na aplicação central.

## Exemplos de Uso
- Adicionar um novo aplicativo (app) criado ao sistema (adicionando ao array `INSTALLED_APPS`).
- Mudar o banco de dados de desenvolvimento (SQLite3) para o de produção (PostgreSQL).
- O servidor web consultar o arquivo `wsgi.py` para processar uma requisição de um cliente.
