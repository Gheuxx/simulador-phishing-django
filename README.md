# Simulador de Phishing - Educação e Conscientização

Um sistema web desenvolvido em Django voltado para o treinamento, educação e conscientização de colaboradores contra ataques de phishing e identificação de riscos.

## Documentação e UML

Você pode consultar detalhes profundos sobre a arquitetura e funcionamento do projeto nos documentos na pasta `/docs`:
- [Casos de Uso](docs/diagrama_casos_de_uso.md) e [DER (Banco de Dados)](docs/diagrama_der.md)
- Explicação do paradigma [Orientado a Objetos (OOP) no Django](docs/django_oop.md)
- Módulos da aplicação: `config`, `accounts`, `core`, `treinamento`, `relatorios`.

## Quickstart (Rodando o Projeto Localmente)

Siga este passo a passo para configurar e rodar o projeto em sua máquina local.

### 1. Clonar o Repositório

Abra o seu terminal (CMD, PowerShell ou Git Bash) e execute:

```bash
# Clone o repositório
git clone https://github.com/Gheuxx/simulador-phishing-django.git

# Entre na pasta do projeto
cd simulador-phishing-django
```

### 2. Criar e Ativar o Ambiente Virtual (venv)

É fortemente recomendado o uso de um ambiente virtual para isolar as dependências deste projeto das outras aplicações em sua máquina.

**No Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**No Linux ou macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

*Nota: Após ativar, você verá um prefixo `(venv)` no seu terminal, indicando que o ambiente está ativo.*

### 3. Instalar as Dependências

Com o `venv` ativo, instale as bibliotecas e frameworks necessários listados no arquivo `requirements.txt` (incluindo o próprio Django):

```bash
pip install -r requirements.txt
```

### 4. Rodar as Migrações do Banco de Dados

O projeto usa SQLite3 como banco de dados de desenvolvimento. Aplique a estrutura das tabelas rodando:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Criar um Superusuário (Opcional, porém Recomendado)

Para conseguir acessar os relatórios no "Dashboard Administrativo" do sistema e poder resetar o progresso dos usuários, crie um superusuário administrativo:

```bash
python manage.py createsuperuser
```
*(Preencha os dados requisitados: usuário, email e senha).*

### 6. Iniciar o Servidor Local

Por fim, inicialize o servidor de desenvolvimento web nativo do Django:

```bash
python manage.py runserver
```

Após o comando rodar com sucesso, você poderá visualizar o site abrindo a seguinte URL no seu navegador web:
[http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

Desenvolvido para ensino e aprimoramento de cultura de Cibersegurança.
